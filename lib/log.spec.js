/**
 * @overview    Log spec
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const connectionPool = require('./get-db-connection-pool')
const createEtlProcessRun = require('./create-etl-process-run')
const log = require('./log')
const populateTestDatabase = require('./populate-test-database')
const resetTestDatabase = require('./reset-test-database')

beforeAll(async () => {
	await resetTestDatabase()
	await populateTestDatabase()
	await createEtlProcessRun({
		etlProcessId: 1
	})
})

afterAll(async () => {
	await connectionPool.end()
})

describe('Logger', () => {
	it(`Throws on invalid status`, async () => {
		await expect(log({
			etlProcessRunId: 1
			, message: ``
			, action: 'Parsing something'
			, status: 'invalid status'
			, severity: 'info'
		}))
		.rejects
		.toThrow(Error)
	})

	it(`Throws on invalid severity`, async () => {
		await expect(log({
			etlProcessRunId: 1
			, message: ``
			, action: 'Parsing something'
			, status: 'started'
			, severity: 'invalid severity'
		}))
		.rejects
		.toThrow(Error)
	})

	it(`Inserts log entry`, async () => {
		await expect(log({
			etlProcessRunId: 1
			, message: ``
			, action: 'Parsing data'
			, status: 'started'
			, severity: 'info'
		}))
		.toResolve()

		await expect(log({
			etlProcessRunId: 1
			, status: 'completed'
			, severity: 'info'
		}))
		.toResolve()
	})
})
