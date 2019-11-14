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
			let sql = await this.checkIfUsernameExists('register', username)

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
			let sql = await this.checkIfUsernameExists('login', username)

			sql = `SELECT password FROM users WHERE username = "${username}";`
			const record = await this.db.get(sql)
			await this.checkIfPasswordMatches(password, record, username)

			return true
		} catch(err) {
			throw err
		}
	}

	async checkIfUsernameExists(method, username) {
		const sql = `SELECT COUNT(id) AS count FROM users WHERE username="${username}";`
		const records = await this.db.get(sql)

		if (method === 'login') {
			if (!records.count) throw new Error(`Username "${username}" not found`)
		} else {
			if (records.count !== 0) throw new Error(`Username "${username}" already in use`)
		}

		return sql
	}

	async checkIfPasswordMatches(password, record, username) {
		const valid = await bcrypt.compare(password, record.password)
		if (valid === false) throw new Error(`Invalid password for account "${username}"`)
	}

	mandatoryFieldsCheck(name, username, password) {
		if (name.length === 0) throw new Error('Name cannot be empty')
		if (username.length === 0) throw new Error('Username cannot be empty')
		if (password.length === 0) throw new Error('Password cannot be empty')
	}
}
