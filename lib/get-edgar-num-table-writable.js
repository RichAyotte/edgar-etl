/**
 * @overview    Return a Writable EDGAR table
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {Writable} = require('stream')
const {oneLine} = require('common-tags')
const connectionPool = require('./get-db-connection-pool')

const insertStmt = oneLine`
	INSERT INTO numbers (
		adsh
		, tag
		, version
		, ddate
		, qtrs
		, uom
		, coreg
		, value
		, footnote
	) VALUES (
		:adsh
		, :tag
		, :version
		, :ddate
		, :qtrs
		, :uom
		, :coreg
		, :value
		, :footnote
	)
`

module.exports = async () => new Writable({
	objectMode: true
	, async write(data, _, done) {
		try {
			await connectionPool.query(insertStmt, data)
			this.emit('insert-data')
		}
		catch (error) {
			this.emit('insert-error', {
				error
				, data
			})
		}
		done()
	}
})
