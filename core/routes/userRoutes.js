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
router.get('/register', async ctx => {
	const data = {
		title: 'Create an account',
		content: 'Page for creating a new account'
	}
	await ctx.render('register', data)
})

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
		await user.register(body.name, body.username, body.password)
		ctx.redirect(`/?msg=new user "${body.username}" added`)
		ctx.session.authorised = true
		ctx.session.user = await user.getLoggedUser(body.username)
		ctx.session.user.avatar = 'images/default-avatar.jpg'
	} catch(err) {
		await ctx.render('register', {title: 'Create an account',
			 content: 'Page for creating a new account', msg: err.message})
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
	} else {
		const data = {
			title: 'Login',
			content: 'Page for logging into an account'
		}
		await ctx.render('login', data)
	}
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
		ctx.session.user = await user.getLoggedUser(body.username)

		return ctx.redirect('/?msg=you are now logged in...')
	} catch(err) {
		await ctx.render('login', {title: 'Login',
			content: 'Login', msg: err.message})
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
	ctx.session.user = null

	ctx.redirect('/?msg=you are now logged out...')
})

/**
 * The user profile page.
 *
 * @name Profile Page
 * @route {GET} /profile
 */
router.get('/profile', async ctx => {
	if(ctx.session.authorised !== true) {
		ctx.redirect('/')
	} else {
		const data = {
			title: `${ctx.session.user.name}'s Profile`,
			content: 'user\'s profile page',
			auth: ctx.session.authorised,
			username: ctx.session.user.username,
			avatarName: ctx.session.user.avatar,
			id: ctx.session.user.id
		}
		await ctx.render('profile', data)
	}
})

/**
 * @name Profile Script
 * @route {POST} /profile-action
 */
router.post('/profile-action',koaBody, async ctx => {
	const user = await new User(process.env.DB_NAME)
	const data = {
		filetype: ctx.request.files.avatar.type,
		path: ctx.request.files.avatar.path,
		userId: ctx.session.user.id,
		username: ctx.session.user.username
	}
	ctx.session.user.avatar = await user.uploadPicture(data , 'image/png' )
	console.log('returned: ', ctx.session.user.avatar)
	ctx.redirect('/profile?msg=Avatar changed')
})


module.exports = router
