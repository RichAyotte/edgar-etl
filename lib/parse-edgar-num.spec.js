/**
 * @overview    CSV Parser stream spec
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const fs = require('fs')
const {Writable} = require('stream')
const parseEdgarNum = require('./parse-edgar-num')

const getParsedNumbers = () => new Promise((resolve, reject) => {
	const parsedNumbers = []
	fs.createReadStream(`./sample-data/num-min.txt`)
	.pipe(parseEdgarNum)
	.pipe(new Writable({
		objectMode: true
		, write(data, _, done) {
			parsedNumbers.push(data)
			done()
		}
	}))
	.on('finish', () => {
		resolve(parsedNumbers)
	})
	.on('error', error => {
		reject(error)
	})
	.on('skip', error => {
		reject(error)
	})
})

describe('EDGAR number parser', () => {
	it(`Parses data into objects`, async () => {
		expect.assertions(1)
		const parsedNumbers = await getParsedNumbers()
		expect(parsedNumbers).toMatchSnapshot()
	})
})
