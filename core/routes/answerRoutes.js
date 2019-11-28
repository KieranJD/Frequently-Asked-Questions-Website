'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const Answer = require('../models/answer')
const Question = require('../models/question')

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
		answers: answers
	}
	if (ctx.session.authorised === true) {
		data.auth = ctx.session.authorised
		data.username = ctx.session.user.username
		data.avatarName = ctx.session.user.avatar
		data.id = ctx.session.user.id
	}
	console.table(data)
	await ctx.render('answer', data)
})

router.post('/question/:question_id/answer-action', async ctx => {
	try{
		const answer = await new Answer(process.env.DB_NAME)
		const question = await new Question(process.env.DB_NAME)
		const request = {body: ctx.request.body, parameters: ctx.params, session: ctx.session}
		const date = await question.currentDate(new Date())
		await answer.createAnswer(request, date)
		ctx.redirect(`/question/${request.parameters.question_id}/answers`)
	} catch(err) {
		const data = {title: ctx.params.question_id, content: 'Answers to a question', msg: err.message}
		if (ctx.session.authorised === true) {
			data.auth = ctx.session.authorised
			data.username = ctx.session.user.username
		}
		await ctx.render('answer', data)
	}
})

module.exports = router
