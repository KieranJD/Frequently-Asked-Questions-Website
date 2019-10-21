'use strict'

const Koa = require('koa')
const views = require('koa-views')
const staticDirectory = require('koa-static')

const exampleRoutes = require('./core/routes/exampleRoutes')

const app = new Koa()

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

app.use(staticDirectory('./public'))
app.use(exampleRoutes.routes())
app.use(exampleRoutes.allowedMethods())

module.exports = app
