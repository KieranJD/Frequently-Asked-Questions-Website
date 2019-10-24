'use strict'

const Database = require('sqlite-async')

const dbName = 'server.db'

module.exports = class Question {
	async getAllQuestions(query) {
		try {
			let sql = 'SELECT id, title, question FROM Questions;'
			console.log(query.search)
			if(query !== undefined && query.search !== undefined) {
				sql = `SELECT id, title, question FROM Questions
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

	async insertQuestion(request) {
		console.log(request.body)
		const body = request.body
		const sql = `INSERT INTO Questions(title, question) 
			VALUES("${body.title}", "${body.question}");`
		console.log(sql)
		const db = await Database.open(dbName)
		await db.run(sql)
		await db.close()
	}

}
