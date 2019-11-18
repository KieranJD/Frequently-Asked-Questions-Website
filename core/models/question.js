'use strict'

const Database = require('sqlite-async')
const table = require('../dbTables')

module.exports = class Question {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await Database.open(dbName)
			await this.db.run(table.createQuestionsTable())
			return this
		})()
	}

	async getAllQuestions(query) {
		let sql = 'SELECT * FROM questions;'
		if(query !== undefined && query.search !== undefined) {
			sql = `SELECT * FROM questions WHERE upper(title) LIKE "%${query.search}%";`
		}
		const data = await this.db.all(sql)
		return data
	}

	async currentDate(today) {
		const dd = today.getDate().toString()
		const mm = (today.getMonth()+1).toString() //As January is 0.
		const yyyy = today.getFullYear()
		today = dd.concat( '/',mm,'/',yyyy)
		return today
	}

	async insertQuestion(request, session, date) {
		if(request.title === '') throw new Error('Title cannot be left empty')
		if(request.body === '') throw new Error('Question cannot be left empty')
		const sql = `INSERT INTO questions(title, body, date, user_id) 
			VALUES("${request.title}", "${request.body}", "${date}", "${session.user.id}");`
		await this.db.run(sql)
	}

	async countQuestions() {
		const sql = 'SELECT COUNT(*) as questions FROM questions'
		const data = await this.db.get(sql)
		return data.questions
	}
}
