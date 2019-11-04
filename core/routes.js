'use strict'

const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const bcrypt = require('bcrypt-promise')
const sqlite = require('sqlite-async')
const User = require('./models/user')
const saltRounds = 10

let auth = false
const user = new User()
router.get('/', async ctx => await ctx.render('home', {title: 'Home'}))


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => {
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	data.countries = ['UK', 'Europe', 'World']
	await ctx.render('register', data)
})

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */

router.post('/register', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		// ENCRYPTING PASSWORD AND BUILDING SQL
		body.pass = await bcrypt.hash(body.pass, saltRounds)
		user.register(body.user,body.pass)
		// REDIRECTING USER TO HOME PAGE
		ctx.redirect(`/?msg=new user "${body.user}" added`)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/login', async ctx => {
	console.log(auth)
	if(auth) {
		ctx.redirect('/')
	}
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	if(ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', {title: 'Login'}, data)
})

router.post('/login', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		const db = await sqlite.open('./website.db')
		// DOES THE USERNAME EXIST?
		const records = await db.get(`SELECT count(id) AS count FROM users WHERE user="${body.user}";`)
		if(!records.count) return ctx.redirect('/login?msg=invalid%20username')
		const record = await db.get(`SELECT pass FROM users WHERE user = "${body.user}";`)
		await db.close()
		// DOES THE PASSWORD MATCH?
		const valid = await bcrypt.compare(body.pass, record.pass)
		if(valid === false) return ctx.redirect(`/login?user=${body.user}&msg=invalid%20password`)
		// WE HAVE A VALID USERNAME AND PASSWORD
		auth = true
		return ctx.redirect('/?msg=you are now logged in...')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/logout', async ctx => {
	auth = false
	ctx.redirect('/login')
})

module.exports = router
