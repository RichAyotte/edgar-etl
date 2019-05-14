/**
 * @overview    Download EDGAR report
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const fs = require('fs')
const {mkdir} = require('fs').promises
const getUrlStream = require('./get-url-stream')
const url = `https://www.sec.gov/files/dera/data/financial-statement-data-sets`

module.exports = async ({filename, outputPath = './incoming'} = {}) => {
	try {
		await mkdir(outputPath)
	}
	catch (error) {
		if (error.code !== 'EEXIST') {
			throw error
		}
	}

	const outputStream = fs.createWriteStream(`${outputPath}/${filename}`)
	const urlStream = await getUrlStream({url: `${url}/${filename}`})

	return new Promise((resolve, reject) => {
		urlStream
		.pipe(outputStream)
		.on('error', error => {
			reject(new Error(error))
		})
		.on('finish', () => {
			resolve(`${outputPath}/${filename}`)
		})
	})
}
