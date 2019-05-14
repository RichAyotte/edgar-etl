/**
 * @overview    Create URL Stream
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const https = require('https')

module.exports = async ({url} = {}) => new Promise((resolve, reject) => {
	https.get(url, response => {
		if (response.statusCode !== 200) {
			reject(new Error(`Fetching ${url} failed.`))
		}

		response
		.on('error', () => {
			reject(new Error(`Error streaming from ${url}`))
		})

		resolve(response)
	})
})
