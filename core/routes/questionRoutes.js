'use strict'

const Router = require('koa-router')
const Question = require('../models/question')

const router = new Router()

router.get('/', async ctx => {
	try{
		const question = await new Question('website.db')
		const data = await question.getAllQuestions(ctx.query)
	    console.log('Data', data)
	    await ctx.render('home', {Questions: data, title: 'Welcome to the GameHub', loggedIn: ctx.session.authorised, userName: ctx.session.userName})
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.post('/insertquestion', async ctx => {
	try{
		const question = await new Question('website.db')
		const date = await question.currentDate()
		await question.insertQuestion(ctx.request.body,date)
		ctx.redirect('/')
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/createquestion', async ctx => ctx.render('createquestion', {title: 'Create a Question'}))

module.exports = router
