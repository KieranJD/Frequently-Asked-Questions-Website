'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')


/**
 *
 *
 * @name Answers Page
 * @route {GET} /
 */
router.get('/question/:question_id/answers', async ctx => {
	let question = await new Question(process.env.DB_NAME)
	question = await question.getOneQuestion(ctx.params.question_id)
	const answer = await new Answer(process.env.DB_NAME)
	const answers = await answer.getAnswersByQuestion(ctx.params.question_id)
	const data = {
		title: question.title,
		content: 'Answers to a question',
		question: question,
		answers: answers,
	}
	if (ctx.session.authorised === true) {
		await pushSessionItemsToObject(data, ctx)
		if (question.user_id === ctx.session.user.id) data.author = true
	}
	await ctx.render('answer', data)
})

router.post('/question/:question_id/answer-action', async ctx => {
	try{
		const { question, answer } = await createObjects()
		const request = {body: ctx.request.body, parameters: ctx.params, session: ctx.session}
		const date = await question.currentDate(new Date())
		await answer.createAnswer(request, date)
		ctx.redirect(`/question/${request.parameters.question_id}/answers`)
	} catch(err) {
		let question = await new Question(process.env.DB_NAME)
		question = await question.getOneQuestion(ctx.params.question_id)
		const answer = await new Answer(process.env.DB_NAME)
		const answers = await answer.getAnswersByQuestion(ctx.params.question_id)
		const data = {title: question.title, content: 'Answers to a question', msg: err.message,
			question: question, answers: answers}
		if (ctx.session.authorised === true) {
			await pushSessionItemsToObject(data, ctx)
			if (question.user_id === ctx.session.user.id) data.author = true
		} await ctx.render('answer', data)
	}
})

router.post('/question/:question_id/answer-correct-action', async ctx => {
	try{
		const { question, answer } = await createObjects()
		const data = {questionID: ctx.params.question_id, userID: ctx.session.user.id}
		await question.solved(data)
		const userID = await answer.getUserID(ctx.request.body.ID)
		const user = await new User(process.env.DB_NAME)
		await user.correctAnswer(userID)
		await answer.isCorrect(ctx.request.body.ID)
		ctx.redirect(`/question/${data.questionID}/answers`)
	} catch(err) {
		console.log(err)
	}
})

router.post('/question/:question_id/answer-flag-action/:id', async ctx => {
	try{
		const answer = await new Answer(process.env.DB_NAME)
		const data = {questionID: ctx.params.question_id, answerID: ctx.params.id}
		const user = await new User(process.env.DB_NAME)
		await user.inappropriateAnswer(data.answerID)
		await answer.isInappropriate(data.answerID)
		ctx.redirect(`/question/${data.questionID}/answers`)
	} catch(err) {
		console.log(err)
	}
})
module.exports = router

async function createObjects() {
	const answer = await new Answer(process.env.DB_NAME)
	const question = await new Question(process.env.DB_NAME)
	return { question, answer }
}

async function pushSessionItemsToObject(object, context) {
	object.auth = context.session.authorised
	object.username = context.session.user.username
	object.avatarName = context.session.user.avatar
	object.id = context.session.user.id
}

