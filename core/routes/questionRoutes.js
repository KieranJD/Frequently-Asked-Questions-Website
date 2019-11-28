'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const Question = require('../models/question')

/**
 * @name Home Page
 * @route {GET} /
 */
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
			data.avatarName = ctx.session.user.avatar
			data.id = ctx.session.user.id
			console.log('path:' , data.avatarName)
		}
		await ctx.render('home', data)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * @name Create Question Page
 * @route {GET} /createquestion
 */
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

/**
 * @name Create Question Action
 * @route {POST} /createquestion
 */
router.post('/createquestion', koaBody, async ctx => {
	try{
		const question = await new Question(process.env.DB_NAME)
		const date = await question.currentDate(new Date())
		await question.insertQuestion(ctx.request.body, ctx.session, date)
		let data = { title: ctx.request.body.title, filetype: ctx.request.files.image.type,
			path: ctx.request.files.image.path
		}
		try{
			data = await question.uploadPicture(data, 'image/png')
			await question.convertThumbnail(data)
			ctx.redirect('/?msg=question added')
		} catch(err) {
			ctx.redirect('/?msg=question added')
		}
	} catch(err) {
		await ctx.render('createquestion', {title: 'Create a question',
			content: 'Create a question', msg: err.message})
	}
})

module.exports = router
