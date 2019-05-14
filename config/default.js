/**
 * @overview    Default config
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

module.exports = {
	db: {
		database: 'edgar'
		, charset: 'utf8_unicode_ci'
		, timezone: 'UTC'
		, namedPlaceholders: true
		, supportBigNumbers: true
		, dateStrings: true
	}
}
