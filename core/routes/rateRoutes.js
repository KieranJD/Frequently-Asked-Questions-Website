'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const Rate = require('../models/rate')

router.get('/rate', async ctx => {
	const rate = await new Rate(process.env.DB_NAME)
	await rate.averageRate(1)
	ctx.body = 'hello'
})

module.exports = router

