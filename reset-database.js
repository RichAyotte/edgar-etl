/**
 * @overview    Reset database and populate with sample process
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const connectionPool = require('./lib/get-db-connection-pool')
const populateTestDatabase = require('./lib/populate-test-database')
const resetTestDatabase = require('./lib/reset-test-database')

const main = async () => {
	await resetTestDatabase()
	await populateTestDatabase()
	await connectionPool.end()
}

main()
