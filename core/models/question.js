'use strict'

const Database = require('sqlite-async')
const table = require('../dbTables')
const fs = require('fs-extra')
const mime = require('mime-types')
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
		try{
			const limit = 50
			if(request.title === '') throw new Error('Title cannot be left empty')
			if(request.title.length >= limit) throw new Error('Title cannot be more than 50 characters')
			if(request.body === '') throw new Error('Question cannot be left empty')
			const sql = `INSERT INTO questions(title, body, date, user_id) 
				VALUES("${request.title}", "${request.body}", "${date}", "${session.user.id}");`
			await this.db.run(sql)
			return true
		}catch(err) {
			throw err
		}
	}

	async uploadPicture(data, mimeType) {
		try{
			const extension = mime.extension(mimeType)
			let QuestionId = await this.db.run('select last_insert_rowid()')
			QuestionId = QuestionId.lastID
			console.log('id: ', QuestionId)
			console.log('filetype:', data.filetype)
			if(data.filetype.includes('image/')) {
				await fs.copy(data.path, `public/images/questions/${QuestionId}/${data.title}.${extension}`)
				const sql = `UPDATE questions SET image = "${data.title}.${extension}" WHERE id = ${QuestionId}`
				this.db.run(sql)
				return true
			} else {
				throw new Error('Invalid Filetype')
			}
		} catch(err) {
			throw err
		}
	}
}
