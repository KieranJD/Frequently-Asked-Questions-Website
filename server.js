'use strict'

// MODULE IMPORTS
const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

// CUSTOM MODULES IMPORTS
const answerRoutes = require('./core/routes/answerRoutes')
const userRoutes = require('./core/routes/userRoutes')
const questionRoutes = require('./core/routes/questionRoutes')

const app = new Koa()
app.keys = ['darkSecret']

app.use(serve('public'))
app.use(koaBody())
app.use(bodyParser())
app.use(session(app))
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

// module.exports = app.listen(async() => {
// 	// MAKE SURE WE HAVE A DATABASE WITH THE CORRECT SCHEMA
// 	const db = await sqlite.open('./website.db')
// eslint-disable-next-line max-len
// 	await db.run('CREATE TABLE IF NOT EXISTS Questions (question_id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, question TEXT, solved INTEGER, user_id TEXT, date TEXT);')
// 	await db.close()
// })

app.use(answerRoutes.routes())
app.use(answerRoutes.allowedMethods())


app.use(questionRoutes.routes())
app.use(questionRoutes.allowedMethods())

app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())

module.exports = app

