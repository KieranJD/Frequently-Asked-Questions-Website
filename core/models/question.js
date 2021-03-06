'use strict'

const Database = require('sqlite-async')
const table = require('../dbTables')
const fs = require('fs-extra')
const mime = require('mime-types')
const sharp = require('sharp')
module.exports = class Question {

	/**
	 * Creates a new Question
	 * @module Question
	 * @classdesc this class allows a user to insert a question including uploading a picture
	 * and then coverting that picture to a thumbnail
	 */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await Database.open(dbName)
			await this.db.run(table.createQuestionsTable())
			await this.db.run(table.createUsersTable())
			return this
		})()
	}

	/**
	 * @function getAllQuestions
	 * @async
	 * @param {string} query - Used by the sql query to find question titles containing this parameter.
	 * @returns {object} data - which contains the question id,title and image.
	 *
	 * @example
	 *		getAllQuestions('Zelda')
	 */
	async getAllQuestions(query) {
		let sql = `SELECT questions.*, users.name AS user_name FROM questions
			INNER JOIN users ON users.id = questions.user_id;`
		if(query !== undefined && query.search !== undefined) {
			sql = `SELECT questions.*, users.name AS user_name FROM questions
				INNER JOIN users ON users.id = questions.user_id WHERE upper(title) LIKE "%${query.search}%";`
		}
		const data = await this.db.all(sql)
		return data
	}

	async getAllUserId() {
		const sql = `SELECT questions.id, users.name AS user_name FROM questions
			INNER JOIN users ON users.id = questions.user_id;`
		const data = await this.db.all(sql)
		return data
	}

	/**
	 * @function getOneQuestion
	 * @async
	 * @param {string} id - id of the question being searched for.
	 * @returns {object} question - which contains the question id,title and image.
	 *
	 * @example
	 *		getOneQuestion('2')
	 */
	async getOneQuestion(id) {
		try {
			const sql = `SELECT * FROM questions WHERE id = "${id}";`
			const question = await this.db.get(sql)
			if (question === undefined) throw new Error('Entry not found')
			return question
		} catch (err) {
			throw err
		}
	}

	/**
	 * @function currentDate
	 * @async
	 * @param {class} today - a class containing the date.
	 * @returns {string} today - the date today as a string.
	 */
	async currentDate(today) {
		const dd = today.getDate().toString()
		const mm = (today.getMonth()+1).toString() //As January is 0.
		const yyyy = today.getFullYear()
		today = dd.concat( '/',mm,'/',yyyy)
		return today
	}

	/**
	 * @function insertQuestion
	 * @async
	 * @param {object} question - contains the question title, body, date and userID.
	 * @returns {true} if there are no errors when inserting the question
	 * @returns {Error} If the title is empty, more than 50 character or the question is empty.
	 */
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

	/**
	 * @function setVarforPicture
	 * @async
	 * @param {object} data - the data object of the picture being uploaded.
	 * @param {string} mimeType - the mime type for the extenstion of the file, which is image/png.
	 * @returns {object} data - the data object including the extection and paths.
	 *
	 * @example
	 *		setVarforPicture(data,'image/png')
	 */
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

	/**
	 * @function savePicture
	 * @async
	 * @param {object} data - the data object of the picture being uploaded.
	 * @returns {true} if the picture is saved with no errors.
	 * @returns {Error} if copying the file to the path fails.
	 * This function copies the file being uploaded to the file path and the thumbnail to the thumb path.
	 */
	async savePicture(data) {
		try{
			await fs.copy(data.path, data.paths.filePath)
			await fs.copy(data.path, data.paths.thumbPath)
			const sql = `UPDATE questions SET image = "${data.imageName}" WHERE id = ${data.QuestionId}`
			await this.db.run(sql)
		} catch(err) {
			throw err
		}
	}

	/**
	 * @function solved
	 * @async
	 * @param {object} data - the data object of the question being uploaded.
	 * @returns {true} when the sql command is executed.
	 * This function copies the file being uploaded to the file path and the thumbnail to the thumb path.
	 */
	async solved(data) {
		const sql = `UPDATE questions SET solved = '1' WHERE id = ${data.questionID}`
		await this.db.run(sql)
		return true
	}

	/**
	 * @function convertThumbnail
	 * @async
	 * @param {object} data - the data object of the picture being uploaded.
	 * @returns {Object} - thumb the thumbail data generated by sharp.
	 * This function resizes the picture to a thumbnail and saves a copy of it.
	 */
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

	/**
	 * @function uploadPicture
	 * @async
	 * @param {string} data - the data object of the picture being uploaded.
	 * @param {string} mimeType - the mime type for the extenstion of the file, which is image/png.
	 * @returns {data} the data of the picture being uploaded now including the extension.
	 * @returns {Error} 'Invalid Filetype, file must be PNG' if the file is of a different file type than png.
	 *
	 * @example
	 *		setVarforPicture(data,'image/png')
	 */
	async uploadPicture(data, mimeType) {
		try{
			data = await this.setVarforPicture(data, mimeType)
			if(data.filetype.includes('image/')) {
				await this.savePicture(data)
				return data
			} else {
				throw new Error('Invalid Filetype')
			}
		} catch(err) {
			throw err
		}
	}

	/**
	 * @function __testData
	 * @async
	 * @returns {user} creates a dummy user in the in-memory db in order to run the required unit tests.
	 */
	async __testData() {
		await this.db.run('INSERT INTO users(name, username, password) VALUES("Wallef", "username", "password");')
	}
}
