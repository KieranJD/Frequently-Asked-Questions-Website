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
}
