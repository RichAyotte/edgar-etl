/**
 * @overview    Create ETL process run test
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const connectionPool = require('./get-db-connection-pool')
const createEtlProcessRun = require('./create-etl-process-run')
const populateTestDatabase = require('./populate-test-database')
const resetTestDatabase = require('./reset-test-database')

beforeAll(async () => {
	await resetTestDatabase()
	await populateTestDatabase()
})

afterAll(async () => {
	await connectionPool.end()
})

describe('Create ETL Process run', () => {
	it(`Throws on invalid process id`, async () => {
		await expect(createEtlProcessRun({
			etlProcessId: 2
			, status: 'started'
		}))
		.rejects
		.toThrow(Error)
	})

	it(`Creates a process run`, async () => {
		await expect(createEtlProcessRun({
			etlProcessId: 1
			, status: 'started'
		}))
		.resolves
		.toMatchSnapshot()
	})
})
