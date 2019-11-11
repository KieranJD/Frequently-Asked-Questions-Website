'use strict'
const sqlite = require('sqlite-async')
module.exports = class User {
	constructor(dbName = 'testing.db') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async register(username,pass) {
		const sql = `INSERT INTO users(user, pass) VALUES("${username}", "${pass}")`
		console.log('sql:', sql)
		// DATABASE COMMANDS
		await this.db.run(sql)
	}

	async login() {
		// TO DO
	}
}
