'use strict'

const sqlite = require('sqlite-async')
const table = require('../dbTables')

module.exports = class Answer {

	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createAnswersTable())
			return this
		})()
	}

	async createAnswer(request, date) {
		try {
			if (request.body.body === '') throw new Error('Answer cannot be empty!')
			const sql = `INSERT INTO answers(body, date, user_id, question_id) 
			VALUES("${request.body.body}", "${date}", "${request.session.user_id}",
			"${request.parameters.question_id}");`
			this.db.run(sql)
			return true
		} catch (err) {
			throw err
		}
	}
}
