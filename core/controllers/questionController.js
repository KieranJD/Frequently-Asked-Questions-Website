'use strict'

const Question = require('../models/question')

module.exports = class QuestionController {

	static showExample() {
		const question = new Question()
		console.log(question.example())
		return question.example()
	}
}
