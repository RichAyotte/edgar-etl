/**
 * @overview    Reset database
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const connectionPool = require('./get-db-connection-pool')
const statements = [
	`
		SET FOREIGN_KEY_CHECKS = 0
	`
	, `
		TRUNCATE etl_logs
	`
	, `
		TRUNCATE etl_process_runs
	`
	, `
		TRUNCATE etl_processes
	`
	, `
		TRUNCATE numbers
	`
	, `
		TRUNCATE statements
	`
	, `
		TRUNCATE submissions
	`
	, `
		TRUNCATE tags
	`
	, `
		SET FOREIGN_KEY_CHECKS = 1
	`
]

module.exports = async () => {
	const connection = await connectionPool.getConnection()
	return Promise.all(
		statements.map(
			async statement => connection.query(statement)
		)
	)
}
