'use strict'

const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx => await ctx.render('home', {title: 'Home'}))

module.exports = router
