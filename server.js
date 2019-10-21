'use strict'

require('dotenv').config()
const Koa = require('koa')
const views = require('koa-views')
const Router = require('./core/routes')

/* USER STUFF */
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const sqlite = require('sqlite-async')
const app = new Koa()
const port = process.env.SERVER_PORT
app.use(require('koa-static')('public'))
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

/* Stuff to move for user */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
module.exports = app.listen(port, async() => {
	// MAKE SURE WE HAVE A DATABASE WITH THE CORRECT SCHEMA
	const db = await sqlite.open('./website.db')
	await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT);')
	await db.close()
	console.log(`listening on port ${port}`)
})
