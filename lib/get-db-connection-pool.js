/**
 * @overview    Database connection
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @license     MIT License
 */

'use strict'

const mysql = require('mysql2')
const dbConfig = require('config').db
const pool = mysql.createPool(dbConfig)

module.exports = pool.promise()
