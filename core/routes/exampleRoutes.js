'use strict'

const Router = require('koa-router')
const router = new Router()

const mockQuestions = [
	{
		'title': 'SK Telecom T1 are accomplished eGamers associated with which game?',
		'date': '10 Jan 2019',
		'user': 'Wallef Borges',
		'solved': false
	  },
	  {
		'title': 'Which videogame holds the record for having the highest budget ever to produce?',
		'date': '17 Sep 2019',
		'user': 'Ben Townsend',
		'solved': true
	  },
	  {
		'title': 'SK Telecom T1 are accomplished eGamers associated with which game?',
		'date': '10 Jan 2019',
		'user': 'Kieran Dhir',
		'solved': true
	  },
	  {
		'title': 'Which videogame holds the record for having the highest budget ever to produce?',
		'date': '17 Sep 2019',
		'user': 'Avelino Tomas',
		'solved': false
	  },
	  {
		'title': 'Which videogame holds the record for having the highest budget ever to produce?',
		'date': '17 Sep 2019',
		'user': 'Mihai Ene',
		'solved': false
	  } ,
]

/**
 * Example of a home page layout
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	console.log(ctx.session.authorised)
	await ctx.render('home', {title: 'Welcome to the GameHub', mockData: mockQuestions, loggedIn: ctx.session.authorised, userName: ctx.session.userName})
})

module.exports = router
