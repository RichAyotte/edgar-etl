/**
 * @overview    Populate database with sample process
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {oneLine} = require('common-tags')
const connectionPool = require('./get-db-connection-pool')

const statements = [
	oneLine`
		INSERT INTO etl_processes (name, description)
		VALUES (
			'load-edgar-numbers'
			, 'Download EDGAR file from SEC website and load numbers into tables.'
		)
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
