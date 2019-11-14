'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const User = require('../models/user')

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register', {title: 'Register'}))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register-action
 */

router.post('/register-action', koaBody, async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(process.env.DB_NAME)

		await user.register(body.username ,body.password)

		ctx.redirect(`/?msg=new user "${body.username}" added`)
		ctx.session.authorised = true
		ctx.session.userName = body.username
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * The user login page.
 *
 * @name Login Page
 * @route {GET} /login
 */

router.get('/login', async ctx => {
	if(ctx.session.authorised === true) {
		ctx.redirect('/')
	}

	await ctx.render('login', {title: 'Login'})
})

/**
 * The script to process user logins.
 *
 * @name Login Script
 * @route {POST} /login-action
 */

router.post('/login-action', async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(process.env.DB_NAME)
		await user.login(body.username, body.password)

		ctx.session.authorised = true
		ctx.session.userName = body.username

		return ctx.redirect('/?msg=you are now logged in...')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * The user login page.
 *
 * @name Logout Page
 * @route {GET} /logout
 */

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.session.userName = null

	ctx.redirect('/login?msg=you are now logged out...')
})

router.get('/profile', async ctx => {
	await ctx.render('profile', {title: 'Profile', loggedIn: ctx.session.authorised, userName: ctx.session.userName})
})

module.exports = router
