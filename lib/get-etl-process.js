/**
 * @overview    Get ETL process
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {oneLine} = require('common-tags')
const connectionPool = require('./get-db-connection-pool')

module.exports = async ({name} = {}) => {
	const [rows] = await connectionPool.query(oneLine`
		SELECT
			*
		FROM
			etl_processes
		WHERE
			name = :name
		LIMIT 1
	`, {name})

	if (rows.length === 0) {
		throw new Error(`ETL process named ${name} not found.`)
	}

	return rows[0]
}
