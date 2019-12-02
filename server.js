'use strict'

// MODULE IMPORTS
const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')
const session = require('koa-encrypted-session')
const Handlebars = require('handlebars')

// CUSTOM MODULES IMPORTS
const answerRoutes = require('./core/routes/answerRoutes')
const userRoutes = require('./core/routes/userRoutes')
const questionRoutes = require('./core/routes/questionRoutes')
const rateRoutes = require('./core/routes/rateRoutes')

const app = new Koa()

app.keys = ['darkSecret']

app.use(serve('public'))
app.use(koaBody())
app.use(bodyParser())
app.use(session({
	key: 'session',
	secretKey: Buffer.from('EsAg64LMvGITBBz1ZGLfDNU/MYqGDpTzJ1u4BsvIfTw=', 'base64')
}, app))
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
	})
)

Handlebars.registerHelper('if_diff', function(a, b, opts) {
	if (a !== b) {
		console.log(this)
		return opts.fn(this)
	} else {
		return opts.inverse(this)
	}
})

app.use(answerRoutes.routes())
app.use(answerRoutes.allowedMethods())

app.use(questionRoutes.routes())
app.use(questionRoutes.allowedMethods())

app.use(userRoutes.routes())
app.use(userRoutes.allowedMethods())

app.use(rateRoutes.routes())
app.use(rateRoutes.allowedMethods())

module.exports = app

