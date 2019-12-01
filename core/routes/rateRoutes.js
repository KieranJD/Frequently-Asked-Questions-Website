'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const Rate = require('../models/rate')
const Answer = require('../models/answer')
const Question = require('../models/question')

router.post('/question/:question_id/rate/:answer_id', async ctx => {
	try {
		const rate = await new Rate(process.env.DB_NAME)
		const request = {body: ctx.request.body, parameters: ctx.params, session: ctx.session}
		await rate.rateAnswer(request)
		const averageRate = await rate.averageRate(ctx.params.answer_id)
		await rate.updateAnswerRate(ctx.params.answer_id, averageRate)
		ctx.redirect('back')
	} catch (err) {
		const { question, answer } = await createObjects()
		const one = await question.getOneQuestion(ctx.params.question_id)
		const answers = await answer.getAnswersByQuestion(ctx.params.question_id)
		const data = {title: one.title, msg: await reworded(err.message), question: one, answers: answers}
		if (ctx.session.authorised === true) {
			await pushSessionItemsToObject(data, ctx)
			if (question.user_id === ctx.session.user.id) data.author = true
		}
		await ctx.render('answer', data)
	}
})

module.exports = router

async function pushSessionItemsToObject(object, context) {
	object.auth = context.session.authorised
	object.username = context.session.user.username
	object.avatarName = context.session.user.avatar
	object.id = context.session.user.id
}

async function reworded(err) {
	if (err === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: rates.user_id, rates.answer_id') {
		err = 'This answer was already rated by you'
	}
	return err
}

async function createObjects() {
	const answer = await new Answer(process.env.DB_NAME)
	const question = await new Question(process.env.DB_NAME)
	return { question, answer }
}
