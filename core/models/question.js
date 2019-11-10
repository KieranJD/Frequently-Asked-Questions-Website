'use strict'

const Database = require('sqlite-async')

const dbName = 'website.db'

module.exports = class Question {

	/*constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await Database.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS Questions (question_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, question TEXT)'
			await this.db.run(sql)
			return this
		})()
	}*/

	async getAllQuestions(query) {
		try {
			let sql = 'SELECT question_id, title, question, solved, user_id, date FROM Questions;'
			console.log(query.search)
			if(query !== undefined && query.search !== undefined) {
				sql = `SELECT question_id, title, question, solved, user_id, date FROM Questions
								WHERE upper(title) LIKE "%${query.search}%";`
			}
			const db = await Database.open(dbName)
			const data = await db.all(sql)
			await db.close()
			console.log(data)
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
		console.log(request.body)
		const body = request.body
		const sql = `INSERT INTO Questions(title, question,date) 
			VALUES("${body.title}", "${body.question}", "${date}");`
		console.log(sql)
		const db = await Database.open(dbName)
		await db.run(sql)
		await db.close()
	}

	/*async getAllQuestions(query) {
		try {
			let sql = 'SELECT question_id, title, question FROM Questions;'
			console.log(query.search)
			if(query !== undefined && query.search !== undefined) {
				sql = `SELECT question_id, title, question FROM Questions
								WHERE upper(title) LIKE "%${query.search}%";`
			}
			const data = await this.db.all(sql)
			console.log(data)
			return data
		} catch(err) {
			return err.message
		}
	}

	async insertQuestion(request) {
		console.log(request.body)
		const body = request.body
		const sql = `INSERT INTO Questions(title, question) 
			VALUES("${body.title}", "${body.question}");`
		console.log(sql)
		await this.db.run(sql)
	}*/

}
