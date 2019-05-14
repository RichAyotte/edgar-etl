/**
 * @overview    Logger
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {oneLine} = require('common-tags')
const connectionPool = require('./get-db-connection-pool')

module.exports = async ({
	etlProcessRunId
	, message = null
	, action = null
	, status
	, severity
} = {}) => connectionPool.query(
	oneLine`
		INSERT INTO etl_logs (
			etl_process_run_id
			, message
			, action
			, status
			, severity
		) VALUES (:etlProcessRunId, :message, :action, :status, :severity)
	`, {
		etlProcessRunId
		, message
		, action
		, status
		, severity
	}
)
