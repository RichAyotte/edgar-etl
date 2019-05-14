/**
 * @overview    Validate EDGAR number stream
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {Transform} = require('stream')
const {ObjectModel} = require('objectmodel')

// The uom is intentionaly set to just ['USD', 'shares'] and missing 'pure' to
// demonstrate a validation error in the stream.
const edgarNumber = new ObjectModel({
	adsh: /[\d-]{1,20}/
	, tag: String
	, version: String
	, coreg: String
	, ddate: Number
	, qtrs: Number
	, uom: ['USD', 'shares']
	, value: ['', Number]
	, footnote: String
})

module.exports = new Transform({
	readableObjectMode: true
	, writableObjectMode: true
	, transform(data, _, done) {
		try {
			edgarNumber(data)
			this.push(data)
		}
		catch (error) {
			this.emit('validation-error', {
				data
				, error
			})
		}
		done()
	}
})
