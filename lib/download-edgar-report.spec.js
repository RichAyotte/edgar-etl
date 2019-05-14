/**
 * @overview    Download EDGAR report test
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const fs = require('fs').promises
const downloadEdgarReport = require('./download-edgar-report')

describe('Download EDGAR Report', () => {
	it(`downloads file to speficied directory`, async () => {
		const filename = '2009q1.zip'
		const outputPath = '/tmp'

		const filePath = await downloadEdgarReport({
			filename
			, outputPath
		})
		expect(filePath).toBe(`${outputPath}/${filename}`)

		const fsStat = await fs.stat(filePath)
		expect(fsStat.size).toBeGreaterThan(1)
	})
})
