/**
 * @overview    Jest config
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

module.exports = {
	coverageDirectory: 'test/coverage'
	, collectCoverageFrom: [
		'index.js'
		, 'lib/**/*.js'
	]
	, setupFilesAfterEnv: ['jest-extended', '<rootDir>/jest-env-setup']
	, verbose: false
}
