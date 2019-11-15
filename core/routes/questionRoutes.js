'use strict'

require('dotenv').config()
const Router = require('koa-router')
const Question = require('../models/question')

const router = new Router()

router.get('/', async ctx => {
	try{
		const question = await new Question(process.env.DB_NAME)
		const data = await question.getAllQuestions(ctx.query)

		await ctx.render('home', {Questions: data, title: 'Welcome to the GameHub',
			loggedIn: ctx.session.authorised, userName: ctx.session.user.username})
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.post('/insertquestion', async ctx => {
	try{
		const question = await new Question(process.env.DB_NAME)
		const date = await question.currentDate(new Date())
		await question.insertQuestion(ctx.request.body,date)
		ctx.redirect('/')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/createquestion', async ctx => ctx.render(
	'createquestion', {title: 'Create a Question', loggedIn: ctx.session.authorised,
		userName: ctx.session.user.username}))

module.exports = router
