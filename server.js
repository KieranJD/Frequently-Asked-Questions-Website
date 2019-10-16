'use strict'

require('dotenv').config()
const Koa = require('koa')
const views = require('koa-views')

const Router = require('./core/routes')

const app = new Koa()
const port = process.env.SERVER_PORT

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

app.use(Router.routes())
app.use(Router.allowedMethods())

app.listen(port, () => console.log(`Server running on ${port}...`))
