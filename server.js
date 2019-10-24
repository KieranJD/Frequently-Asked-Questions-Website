'use strict'

const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const koaBody = require('koa-body')

/*
const exampleRoutes = require('./core/routes/exampleRoutes')
const answerRoutes = require('./core/routes/answerRoutes')
*/

const questionRoutes = require('./core/routes/questionRoutes')

const app = new Koa()

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

/*
app.use(exampleRoutes.routes())
app.use(exampleRoutes.allowedMethods())

app.use(answerRoutes.routes())
app.use(answerRoutes.allowedMethods())
*/

app.use(questionRoutes.routes())
app.use(questionRoutes.allowedMethods())

module.exports = app
