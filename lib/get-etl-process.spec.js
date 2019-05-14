/**
 * @overview    Get ETL process spec
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const connectionPool = require('./get-db-connection-pool')
const getEtlProcess = require('./get-etl-process')
const populateTestDatabase = require('./populate-test-database')
const resetTestDatabase = require('./reset-test-database')

beforeAll(async () => {
	await resetTestDatabase()
	await populateTestDatabase()
})

afterAll(async () => {
	await connectionPool.end()
})

describe('Get ETL Process', () => {
	it(`Throws on invalid process id`, async () => {
		await expect(getEtlProcess({
			name: 'load-edgar-tags'
		}))
		.rejects
		.toThrow(Error)

		await expect(getEtlProcess({
			name: 'load-edgar-numbers'
		}))
		.resolves.toMatchObject({
			id: 1
			, name: 'load-edgar-numbers'
			, description: 'Download EDGAR file from SEC website and load numbers into tables.'
		})
	})
})
