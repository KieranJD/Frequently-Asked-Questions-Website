'use strict'

const Router = require('koa-router')
const Question = require('../models/question')

const router = new Router()
const question = new Question()


router.get('/', async ctx => {
	try{
		const data = await question.getAllQuestions(ctx.query)
	    console.log(data)
	    await ctx.render('home', {Questions: data,title: 'Home'})
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.post('/insertquestion', async ctx => {
	try{
		await question.insertQuestion(ctx.request)
		ctx.redirect('/')
	}catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/createquestion', async ctx => ctx.render('createquestion'))

module.exports = router
