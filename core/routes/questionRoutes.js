'use strict'

require('dotenv').config()
const Router = require('koa-router')
const Question = require('../models/question')

const router = new Router()

router.get('/', async ctx => {
	try{
		const question = await new Question(process.env.DB_NAME)

		const data = {
			title: 'Welcome to the GameHub',
			content: 'Home page with all the questions',
			questions: await question.getAllQuestions(ctx.query)
		}

		if (ctx.session.authorised === true) {
			data.auth = ctx.session.authorised
			data.username = ctx.session.user.username
		}

		await ctx.render('home', data)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/createquestion', async ctx => {
	if(ctx.session.authorised !== true) {
		ctx.redirect('/')
	} else {
		const data = {
			title: 'Create a question',
			content: 'Page for creating a new question',
			auth: ctx.session.authorised,
			username: ctx.session.user.username
		}
		await ctx.render('createquestion', data)
	}
})

router.post('/createquestion', async ctx => {
	try{
		const question = await new Question(process.env.DB_NAME)
		const date = await question.currentDate(new Date())
		await question.insertQuestion(ctx.request.body, ctx.session, date)

		ctx.redirect('/')
	} catch(err) {
		await ctx.render('createquestion', {msg: err.message})
	}
})

module.exports = router
