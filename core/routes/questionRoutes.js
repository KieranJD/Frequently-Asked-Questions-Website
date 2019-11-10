'use strict'

const Router = require('koa-router')
const Question = require('../models/question')

const router = new Router()
//const question = new Question('website.db')
const question = new Question()

router.get('/', async ctx => {
	try{
		const data = await question.getAllQuestions(ctx.query)
	    console.log('Data', data)
	    await ctx.render('home', {Questions: data, title: 'Welcome to the GameHub', loggedIn: ctx.session.authorised, userName: ctx.session.userName})
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.post('/insertquestion', async ctx => {
	try{
		const date = await question.currentDate()
		await question.insertQuestion(ctx.request,date)
		ctx.redirect('/')
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/createquestion', async ctx => ctx.render('createquestion', {title: 'Create a Question', loggedIn: ctx.session.authorised, userName: ctx.session.userName}))

module.exports = router
