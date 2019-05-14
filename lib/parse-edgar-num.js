/**
 * @overview    CSV stream parser
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const parse = require('csv-parse')

module.exports = parse({
	cast: true
	, columns: true
	, delimiter: '\t'
	, skip_empty_lines: true
	, skip_lines_with_error: true
	, trim: true
})
