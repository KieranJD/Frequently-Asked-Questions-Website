'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const Question = require('../models/question')
const badge = require('../models/badge')
const User = require('../models/user')

/**
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	try{
		const {question, user} = await createObjects()
		let questdata = await question.getAllQuestions(ctx.query)
		if (questdata.length > 0) {
			const star = await user.orderByScore()
			const {bronze, silver, gold} = await assertStar(star)
			const {bronzeQuestionArray, silverQuestionArray, goldQuestionArray} = await badge.
				questionStar(bronze, silver, gold)
			questdata = await badge.addStars(questdata, bronzeQuestionArray, silverQuestionArray, goldQuestionArray)
		}
		let data = { title: 'Welcome to the GameHub',
			content: 'Home page with all the questions', questions: questdata }
		if (ctx.session.authorised === true) data = await authData(ctx, data)
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
			username: ctx.session.user.username,
			avatarName: ctx.session.user.avatar,
			id: ctx.session.user.id
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
		await ctx.render('createquestion', {title: 'Create a question', msg: err.message,
			username: ctx.session.user.username, avatarName: ctx.session.user.avatar, auth: ctx.session.authorised,})
	}
})

async function createObjects() {
	const user = await new User(process.env.DB_NAME)
	const question = await new Question(process.env.DB_NAME)
	return { question, user }
}

async function authData(ctx , data) {
	data.auth = ctx.session.authorised
	data.username = ctx.session.user.username
	data.avatarName = ctx.session.user.avatar
	data.id = ctx.session.user.id
	return data
}

async function assertStar(star) {
	const question = await new Question(process.env.DB_NAME)
	const data = await question.getAllUserId()
	const bronze = await badge.bronzeQuestions(star, data)
	const silver = await badge.silverQuestions(star, data)
	const gold = await badge.goldQuestions(star, data)
	return {bronze,silver, gold}
}

module.exports = router
