/**
 * @overview    Create ETL process run
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {oneLine} = require('common-tags')
const connectionPool = require('./get-db-connection-pool')

module.exports = async ({etlProcessId, status = 'started'} = {}) => {
	const [result] = await connectionPool.query(
		oneLine`
		INSERT INTO etl_process_runs (
			etl_process_id
			, status
		) VALUES (:etlProcessId, :status)
		`, {
			etlProcessId
			, status
		}
	)

	return result.insertId
}
