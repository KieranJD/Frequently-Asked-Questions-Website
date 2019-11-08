'use strict'
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const bcrypt = require('bcrypt-promise')
const saltRounds = 10
const User = require('../models/user')
const user = new User()
const accounts = require('../models/account')
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
	console.log(ctx.session.authorised)
	if(ctx.session.authorised === true) {
		ctx.redirect('/')
	}
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	if(ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', {title: 'Login'}, data)
})

router.post('/login', async ctx => { // 19 lines reduced to 10!
 	const body = ctx.request.body
 	try {
 		await accounts.checkCredentials(body.user, body.pass)
		 ctx.session.authorised = true
		 ctx.session.user = body.user
		 console.log(ctx.session.user)
 		return ctx.redirect('/?msg=you are now logged in...')
 	} catch(err) {
 		return ctx.redirect(`/login?user=${body.user}&msg=${err.message}`)
 	}
})


router.get('/logout', async ctx => {
	ctx.session.authorised = false
	ctx.redirect('/login')
})

module.exports = router
