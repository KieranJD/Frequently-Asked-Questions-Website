'use strict'

const sqlite = require('sqlite-async')
const table = require('../dbTables')

module.exports = class Answer {
	/**
	 * Creates a new Question
	 * @module Answer
	 * @classdesc this class allows a user to insert an answer, flag an answer as correct or inappropriate,
	 * and get the user ID of the user who posted the question
	 */
	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createAnswersTable())
			return this
		})()
	}

	/**
	 * @function createAnswer
	 * @async
	 * @param {object} request - contains the andswer title, body and userID.
	 * @param {string} date - todays date.
	 * @returns {true} if there are no errors when inserting the answer
	 * @returns {Error} If the title there is an error with the request data.
	 */
	async createAnswer(request, date) {
		try {
			if (request.body.body === '') throw new Error('Answer cannot be empty!')
			const sql = `INSERT INTO answers(body, date, user_id, question_id) 
			VALUES("${request.body.body}", "${date}", "${request.session.user.id}",
			"${request.parameters.question_id}");`
			await this.db.run(sql)
			return true
		} catch (err) {
			throw err
		}
	}

	/**
	 * @function getUserID
	 * @async
	 * @param {integer} id - the answer ID.
	 * @returns {integer} - the user ID
	 * this function is used to retreive the user ID of the user who posted the answer.
	 */
	async getUserID(id) {
		const sql = `SELECT user_id FROM answers WHERE id = "${id}";`
		const user = await this.db.get(sql)
		return user.user_id
	}

	/**
	 * @function isCorrect
	 * @async
	 * @param {integer} id - the answer ID.
	 * @returns {true} - when the sql command is executed.
	 * this function sets the answer to being the correct answer for the question.
	 * @example
	 * 		isCorrect(1)
	 */
	async isCorrect(id) {
		const sql = `UPDATE answers SET is_correct = 1 WHERE id = "${id}";`
		await this.db.all(sql)
		return true
	}

	/**
	 * @function isCorrect
	 * @async
	 * @param {integer} id - the answer ID.
	 * @returns {true} - when the sql command is executed.
	 * this function sets the answer to being an inappropriate answer for the question.
	 * @example
	 * 		isInappropriate(1)
	 */
	async isInappropriate(id) {
		const sql = `UPDATE answers SET is_inappropriate = 1 WHERE id = "${id}";`
		await this.db.all(sql)
		return true
	}

	/**
	 * @function getAnswersByQuestion
	 * @async
	 * @param {integer} id - the question ID.
	 * @returns {object} - all of the answers to a particular question.
	 * this function returns all the answers which are related to a certrain question ID
	 * @example
	 * 		getAnswersByQuestion(1)
	 */
	async getAnswersByQuestion(id) {
		const sql = `SELECT answers.*, users.name AS user_name FROM answers
			INNER JOIN users ON users.id = answers.user_id WHERE question_id = "${id}";`
		const answers = await this.db.all(sql)
		return answers
	}

	async addStars(answers, bronzeAnswersArray, silverAnswersArray, goldAnswersArray) {
		answers.forEach(entry => {
			if(bronzeAnswersArray.includes(entry.id)) {
				entry.bronze = 'true'
			}
			if(silverAnswersArray.includes(entry.id)) {
				entry.silver = 'true'
			}
			if(goldAnswersArray.includes(entry.id)) {
				entry.gold = 'true'
			}
		})
		return answers
	}


	/**
	 * @function __testData
	 * @async
	 * @returns {user} creates a dummy user in the in-memory db in order to run the required unit tests.
	 */
	async __testData() {
		await this.db.run(table.createUsersTable())
		await this.db.run('INSERT INTO users(name, username, password) VALUES("Wallef", "username", "password");')
	}

	async getAllUserId() {
		const sql = `SELECT answers.id, users.name AS user_name FROM answers
			INNER JOIN users ON users.id = answers.user_id;`
		const data = await this.db.all(sql)
		return data
	}

	async bronzeAnswers(star) {
		console.log(star)
		const Answers = await this.getAllUserId()
		const starArray = []
		const bronzeAnswersArray = []
		for(let i=0; i < star.bronze.length; i++) {
			starArray.push(star.bronze[i].name)
		}
		for(let x=0; x < starArray.length; x++) {
			for(let i=0; i < Answers.length; i++) {
				if (starArray[x] === Answers[i].user_name) bronzeAnswersArray.push(Answers[i].id)
			}
		}
		return bronzeAnswersArray
	}

	async silverAnswers(star) {
		const Answers = await this.getAllUserId()
		const starArray = []
		const silverAnswersArray = []
		for(let i=0; i < star.silver.length; i++) {
			starArray.push(star.silver[i].name)
		}
		for(let x=0; x < starArray.length; x++) {
			for(let i=0; i < Answers.length; i++) {
				if (starArray[x] === Answers[i].user_name) silverAnswersArray.push(Answers[i].id)
			}
		}
		return silverAnswersArray
	}

	async goldAnswers(star) {
		const Answers = await this.getAllUserId()
		const starArray = []
		const goldAnswersArray = []
		for(let i=0; i < star.gold.length; i++) {
			starArray.push(star.gold[i].name)
		}
		for(let x=0; x < starArray.length; x++) {
			for(let i=0; i < Answers.length; i++) {
				if (starArray[x] === Answers[i].user_name) goldAnswersArray.push(Answers[i].id)
			}
		}
		return goldAnswersArray
	}

	async answerStar(bronzeAnswersArray, silverAnswersArray, goldAnswersArray) {
		bronzeAnswersArray = bronzeAnswersArray.filter( ( del ) => !silverAnswersArray.includes( del ))
		silverAnswersArray = silverAnswersArray.filter( ( del ) => !goldAnswersArray.includes( del ))
		return {bronzeAnswersArray, silverAnswersArray, goldAnswersArray}
	}
}
