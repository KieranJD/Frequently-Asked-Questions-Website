'use strict'
require('dotenv').config()
const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const koaBody = require('koa-body')
//const exampleRoutes = require('./core/routes/exampleRoutes')
const answerRoutes = require('./core/routes/answerRoutes')
const sqlite = require('sqlite-async')
const userRoutes = require('./core/routes/userRoutes')
const questionRoutes = require('./core/routes/questionRoutes')

/* USER STUFF */
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const app = new Koa()
app.use(require('koa-static')('public'))
app.use(koaBody())

app.use(views(`${__dirname}/core/views`,
	{
		extension: 'hbs',
		options: {
			partials: {
				header: `${__dirname}/core/views/partials/header`,
				footer: `${__dirname}/core/views/partials/footer`
			}
		},
		map: { hbs: 'handlebars' }
	}))

app.use(serve('public'))

/* Stuff to move for user */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))

module.exports = app.listen(async() => {
	// MAKE SURE WE HAVE A DATABASE WITH THE CORRECT SCHEMA
	const db = await sqlite.open('./website.db')
	await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT);')
	await db.run('CREATE TABLE IF NOT EXISTS Questions (question_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, question TEXT);')
	await db.close()
})
/*
app.use(exampleRoutes.routes())
app.use(exampleRoutes.allowedMethods())
*/
app.use(answerRoutes.routes())
app.use(answerRoutes.allowedMethods())


app.use(questionRoutes.routes())
app.use(questionRoutes.allowedMethods())

app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())

module.exports = app

