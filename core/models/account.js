#!/usr/bin/env node

/**
 * Accounts module
 * @module modules/account
 */

'use strict'

const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')

/**
 * This is a generic function that opens the database, executes a query,
 * closes the database connection and returns the data.
 * @param {String} query - The SQL statement to execute.
 * @returns {Object} - the date returned by the query.
 */
async function runSQL(query) {
	try {
		console.log(query)
		const DBName = './website.db'
		const db = await sqlite.open(DBName)
		const data = await db.all(query)
		await db.close()
		if(data.length === 1) return data[0]
		return data
	} catch(err) {
		throw err
	}
}

module.exports.checkCredentials = async(username, password) => {
	try {
	    const records = await runSQL(`SELECT count(id) AS count FROM users WHERE user="${username}";`)
		if(!records.count) throw new Error('invalid username')
		const record = await runSQL(`SELECT pass FROM users WHERE user = "${username}";`)
		const valid = await bcrypt.compare(password, record.pass)
		if(valid === false) throw new Error('invalid password')
		return true
	} catch(err) {
		throw err
	}
}

module.exports.alreadyTaken = async(username) => {
	try{
		const records = await runSQL(`SELECT count(id) AS count FROM users WHERE user="${username}";`)
		if(records.count) throw new Error('username already taken')
	} catch(err) {
		throw err
	}
}
