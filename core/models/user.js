'use strict'
const sqlite = require('sqlite-async')
module.exports = class User {
	async setName(name) {
		return this.name = name
	}

	async register(username,pass) {
		const sql = `INSERT INTO users(user, pass) VALUES("${username}", "${pass}")`
		console.log(sql)
		// DATABASE COMMANDS
		const db = await sqlite.open('./website.db')
		await db.run(sql)
		await db.close()
	}

	async login() {
		// TO DO
	}
}
