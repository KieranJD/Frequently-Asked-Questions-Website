'use strict'

const Database = require('sqlite-async')
const table = require('../dbTables')
const fs = require('fs-extra')
const mime = require('mime-types')
const sharp = require('sharp')
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

	async setVarforPicture(data, mimeType) {
		data.extension = mime.extension(mimeType)
		const QuestionId = await this.db.run('select last_insert_rowid()')
		data.QuestionId = QuestionId.lastID
		let imageName = data.title.split(' ')
		imageName = imageName[0]
		data.imageName = imageName.concat('.',data.extension)
		data.paths = {
			filePath: `public/images/questions/${data.QuestionId}/${imageName}.${data.extension}`,
			thumbPath: `public/images/questions/thumb/${data.QuestionId}/${imageName}.${data.extension}`
		}
		return data
	}

	async savePicture(data) {
		try{
			console.log(data.paths.filePath)
			await fs.copy(data.path, data.paths.filePath)
			await fs.copy(data.path, data.paths.thumbPath)
			const sql = `UPDATE questions SET image = '${data.imageName}' WHERE id = ${data.QuestionId}`
			await this.db.run(sql)
		} catch(err) {
			throw err
		}
	}

	async convertThumbnail(data) {
		try{
			const thumb = await sharp(data.paths.filePath)
				.resize({width: 360, height: 240})
				.toFile(data.paths.thumbPath)
			return thumb
		} catch(err) {
			throw err
		}
	}

	async uploadPicture(data, mimeType) {
		try{
			data = await this.setVarforPicture(data, mimeType)
			if(data.filetype.includes('image/')) {
				await this.savePicture(data)
				console.log(data)
				return data
			} else {
				throw new Error('Invalid Filetype')
			}
		} catch(err) {
			throw err
		}
	}
}
