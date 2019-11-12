'use strict'

const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')
const queries = require('../dbQueries')

const saltRounds = 10

module.exports = class User {
	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(queries.createUsersTable())
			return this
		})()
	}

	async register(username, password) {
		try {
			if(username.length === 0) throw new Error('missing username')
			if(password.length === 0) throw new Error('missing password')
			let sql = `SELECT COUNT(id) as records FROM users WHERE user="${username}";`
			const data = await this.db.get(sql)
			if(data.records !== 0) throw new Error(`username "${username}" already in use`)
			password = await bcrypt.hash(password, saltRounds)
			sql = `INSERT INTO users(user, pass) VALUES("${username}", "${password}")`
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
}
