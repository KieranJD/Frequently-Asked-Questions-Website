'use strict'

const Database = require('sqlite-async')

module.exports = class Question {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await Database.open(dbName)
			await this.db.run('CREATE TABLE IF NOT EXISTS Questions (question_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, question TEXT, solved INTEGER, user_id TEXT, date TEXT);')
			return this
		})()
	}

	async getAllQuestions(query) {
		try {
			let sql = 'SELECT question_id, title, question, solved, user_id, date FROM Questions;'
			if(query !== undefined && query.search !== undefined) {
				console.log('Query Search', query.search)
				sql = `SELECT question_id, title, question, solved, user_id, date FROM Questions
								WHERE upper(title) LIKE "%${query.search}%";`
			}
			const data = await this.db.all(sql)
			//await this.db.close()
			//console.log('Returned data:', data)
			return data
		} catch(err) {
			return err.message
		}
	}

	async currentDate() {
		let today = new Date()
		const dd = today.getDate().toString()
		const mm = (today.getMonth()+1).toString() //As January is 0.
		const yyyy = today.getFullYear()
		today = dd.concat( '/',mm,'/',yyyy)
		return today
	}

	async insertQuestion(request,date) {
		//console.log('Request data:', request)
		const body = request
		const sql = `INSERT INTO Questions(title, question, date) 
			VALUES("${body.title}", "${body.question}", "${date}");`
		//console.log(sql)
		await this.db.run(sql)
		//await this.db.close()
	}

	async countQuestions() {
		const sql = 'SELECT COUNT(*) as Questions FROM Questions'
		const data = await this.db.get(sql)
		return data.Questions
	}
}
