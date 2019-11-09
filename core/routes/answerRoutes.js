'use strict'

const Router = require('koa-router')
const router = new Router()
const Answer = require('../models/answer')
/**
 *
 *
 * @name Answers Page
 * @route {GET} /
 */
router.get('/question/:question_id/answers', async ctx => {
	const answer = await new Answer('faq.db')
	const data = await answer.getAnswersByQuestion(ctx.params.question_id)

	await ctx.render('answer', {title: data.title, content: 'Answers to a question'})
})

module.exports = router
