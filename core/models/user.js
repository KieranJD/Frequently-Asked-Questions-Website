'use strict'

const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')
const table = require('../dbTables')

const saltRounds = 10

module.exports = class User {
	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createUsersTable())
			return this
		})()
	}

	async register(name, username, password) {
		try {
			this.mandatoryFieldsCheck(name, username, password)
			let sql = await this.uniqueUsernameCheck(username)
			password = await bcrypt.hash(password, saltRounds)
			sql = `INSERT INTO users(name, username, password) VALUES("${name}", "${username}", "${password}")`
			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	async login(username, password) {
		try {
			let sql = `SELECT count(id) AS count FROM users WHERE user="${username}";`
			const records = await this.db.get(sql)
			if(!records.count) throw new Error(`username "${username}" not found`)
			sql = `SELECT pass FROM users WHERE user = "${username}";`
			const record = await this.db.get(sql)
			const valid = await bcrypt.compare(password, record.pass)
			if(valid === false) throw new Error(`invalid password for account "${username}"`)
			return true
		} catch(err) {
			throw err
		}
	}

	mandatoryFieldsCheck(name, username, password) {
		if (name.length === 0) throw new Error('Name cannot be empty')
		if (username.length === 0) throw new Error('Username cannot be empty')
		if (password.length === 0) throw new Error('Password cannot be empty')
	}

	async uniqueUsernameCheck(username) {
		const sql = `SELECT COUNT(id) as records FROM users WHERE username="${username}";`
		const data = await this.db.get(sql)
		if (data.records !== 0) throw new Error(`username "${username}" already in use`)
		return sql
	}
}
