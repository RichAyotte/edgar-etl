/**
 * @overview    Main
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const fs = require('fs')
const {promisify} = require('util')
const {resolve: resolvePath} = require('path')
const {Transform} = require('stream')
const extract = promisify(require('extract-zip'))

const connectionPool = require('./lib/get-db-connection-pool')
const createEtlProcessRun = require('./lib/create-etl-process-run')
const downloadEdgarReport = require('./lib/download-edgar-report')
const getEdgarNumTableWritable = require('./lib/get-edgar-num-table-writable')
const getEtlProcess = require('./lib/get-etl-process')
const log = require('./lib/log')
const parseEdgarNum = require('./lib/parse-edgar-num')
const populateTestDatabase = require('./lib/populate-test-database')
const resetTestDatabase = require('./lib/reset-test-database')

const baseIncomingPath = resolvePath('./incoming')

const logParseError = etlProcessRunId => async error => {
	await log({
		etlProcessRunId
		, message: JSON.stringify(error)
		, action: 'Parsing EDGAR num.txt'
		, status: 'running'
		, severity: 'error'
	})
}

const logInsertError = etlProcessRunId => async error => {
	await log({
		etlProcessRunId
		, message: JSON.stringify(error)
		, action: 'Inserting data into numbers table'
		, status: 'running'
		, severity: 'warning'
	})
}

const main = async () => {
	await resetTestDatabase()
	await populateTestDatabase()

	// Get ETL process
	const {id: etlProcessId} = await getEtlProcess({
		name: 'load-edgar-numbers'
	})

	// Create ETL process run
	const etlProcessRunId = await createEtlProcessRun({
		etlProcessId
	})

	console.log(`Starting ETL process run ID ${etlProcessRunId}.`)

	await log({
		etlProcessRunId
		, status: 'started'
		, severity: 'info'
	})

	let parsedRecordCount = 0
	let insertedRecordCount = 0

	const lineCounter = new Transform({
		readableObjectMode: true
		, writableObjectMode: true
		, transform(data, _, done) {
			if (parsedRecordCount % 500 === 0 && parsedRecordCount > 0) {
				this.emit('status', parsedRecordCount)
			}
			parsedRecordCount += 1
			this.push(data)
			done()
		}
	})

	// Download report from SEC website
	const filePath = await downloadEdgarReport({
		filename: '2009q2.zip'
		, outputPath: `${baseIncomingPath}/${etlProcessRunId}`
	})

	// // Unzip
	await extract(filePath, {
		dir: `${baseIncomingPath}/${etlProcessRunId}`
	})

	// Stream num.txt into the database
	fs.createReadStream(`${baseIncomingPath}/${etlProcessRunId}/num.txt`)
	.pipe(parseEdgarNum)
	.pipe(lineCounter)
	.on('status', count => {
		console.log(`${count} records processed.`)
	})
	.on('skip', logParseError(etlProcessRunId))
	.on('error', logParseError(etlProcessRunId))
	.pipe(await getEdgarNumTableWritable())
	.on('insert-error', logInsertError(etlProcessRunId))
	.on('insert-data', () => {
		insertedRecordCount += 1
	})
	.on('finish', async () => {
		console.log({
			etlProcessRunId
			, status: 'completed'
			, severity: 'info'
		})

		try {
			await log({
				etlProcessRunId
				, status: 'completed'
				, severity: 'info'
			})
		}
		catch (error) {
			console.log(error)
		}

		console.log({
			parsedRecordCount
			, insertedRecordCount
		})

		console.log(`ETL process run ID ${etlProcessRunId} has completed.`)
		connectionPool.end()
	})
}

main()
