/**
 * @overview    Validate EDGAR numbers spec
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const fs = require('fs')
const {Writable} = require('stream')
const parseEdgarNum = require('./parse-edgar-num')
const validateEdgarNum = require('./validate-edgar-num')

const getValidationErrors = async () => new Promise((resolve, reject) => {
	const validationErrors = []
	fs.createReadStream(`./sample-data/num-errors.txt`)
	.pipe(parseEdgarNum)
	.pipe(validateEdgarNum)
	.on('validation-error', error => {
		validationErrors.push(error)
	})
	.pipe(new Writable({
		objectMode: true
		, write(data, _, done) {
			done()
		}
	}))
	.on('finish', () => {
		resolve(validationErrors)
	})
	.on('error', error => {
		reject(error)
	})
	.on('skip', error => {
		reject(error)
	})
})


describe('EDGAR numbers validation', () => {
	it(`Emits validation-error`, async () => {
		expect.assertions(1)
		const validationErrors = await getValidationErrors()
		expect(validationErrors).toMatchSnapshot()
	})
})
