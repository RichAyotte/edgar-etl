/**
 * @overview    Create URL Stream test
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const {Readable} = require('stream')
const getUrlStream = require('./get-url-stream')

describe('URL Stream', () => {
	it(`resolved to a readable stream`, async () => {
		const url = `https://www.sec.gov/files/dera/data/financial-statement-data-sets/2009q1.zip`
		const stream = await getUrlStream({url})
		expect(stream instanceof Readable).toBe(true)
	})
})
