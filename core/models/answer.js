'use strict'

const sqlite = require('sqlite-async')
const queries = require('../dbQueries')

module.exports = class Answer {

	constructor(database) {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(queries.createAnswersTable())
			return this
		})()
	}

	async getAnswersByQuestion(id) {
		try {
			let sql = queries.select('answers.*, questions.title', 'answers')
			sql = `${sql} INNER JOIN questions ON answers.question_id = questions.id
			WHERE question_id = ${id};`

			const data = this.db.get(sql)
			return data
		} catch (err) {
			throw err
		}
	}
}
