'use strict'

const sqlite = require('sqlite-async')
const table = require('../dbTables')

module.exports = class Rates {
	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createRatesTable())
			return this
		})()
	}

	async rateAnswer(request) {
		try {
			if (request.body.rate === '') throw new Error('Rate cannot be empty or a string!')
			const sql = `INSERT INTO rates(rate, user_id, answer_id)
			VALUES ("${request.body.rate}", "${request.session.user.id}", "${request.parameters.answer_id}");`
			this.db.run(sql)
			return true
		} catch (err) {
			throw err
		}
	}

	async averageRate(answerId) {
		const sql = `SELECT rate FROM rates WHERE answer_id = ${answerId};`
		const rates = await this.db.all(sql)
		let averageRate = rates.reduce((accumulator, current) => accumulator + current.rate, 0) / rates.length
		isNaN(averageRate) ? averageRate = 0.0 : averageRate
		return averageRate
	}

	async updateAnswerRate(answerId, avgRate) {
		const sql = `UPDATE answers SET average_rate = "${avgRate}" WHERE id = "${answerId}";`
		await this.db.run(sql)
		return true
	}

	async __testData() {
		await this.db.run(table.createAnswersTable())
		const sql = `INSERT INTO answers(body, date, user_id, question_id) 
			VALUES("Test", "20/12/2010", 1, 1);`
		await this.db.run(sql)
	}
}
