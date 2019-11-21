'use strict'

const sqlite = require('sqlite-async')
const table = require('../dbTables')

module.exports = class Answer {

	constructor(database) {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createAnswersTable())
			return this
		})()
	}
}
