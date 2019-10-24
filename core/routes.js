'use strict'

const Router = require('koa-router')
const Question = require('./models/question')

//temp
const Database = require('sqlite-async')
const handlebars = require('koa-hbs-renderer')
const dbName = 'server.db'
//

const router = new Router()
const question = new Question()

/*
router.get('/', async ctx => await ctx.render('home', {title: 'Home'}))
*/

//temp
router.get('/', async ctx => {
	const data = await question.getAllQuestions(ctx.query)
	console.log(data)
	await ctx.render('home', {Questions: data,title: 'Home'})
})

router.post('/insertquestion', async ctx => {
	try {
		console.log(ctx.request.body)
		const body = ctx.request.body
		const sql = `INSERT INTO Questions(title, question) 
			VALUES("${body.title}", "${body.question}");`
		console.log(sql)
		const db = await Database.open(dbName)
		await db.run(sql)
		await db.close()
		ctx.redirect('/')
	} catch(err) {
		ctx.body = err.message
	}
})

router.get('/createquestion', async ctx => ctx.render('createquestion'))

module.exports = router
