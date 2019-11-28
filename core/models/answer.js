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
			VALUES("${request.body.body}", "${date}", "${request.session.user.id}",
			"${request.parameters.question_id}");`
			this.db.run(sql)
			return true
		} catch (err) {
			throw err
		}
	}

	async getAnswersByQuestion(id) {
		try {
			const sql = `SELECT answers.*, users.name AS user_name FROM answers
				INNER JOIN users ON users.id = answers.user_id WHERE question_id = "${id}";`
			const answers = await this.db.all(sql)
			if (!answers.length) throw new Error('Answers not found!')
			return answers
		} catch (err) {
			throw err
		}
	}

	async __testData() {
		await this.db.run(table.createUsersTable())
		await this.db.run('INSERT INTO users(name, username, password) VALUES("Wallef", "username", "password");')
	}
}
