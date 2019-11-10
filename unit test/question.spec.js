'use strict'

const Question = require('../core/models/question.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('add()', () => {
	// block of tests
	// beforeEach( async() => {
	// 	todo.clear()
	// })
	afterEach( async() => {
		// runs after each test completes
	})
	test('add a single question', async done => {
		expect.assertions(1)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		const body = {title: 'Call of Duty World at War', question: 'Where is the pack-a-punch on Der Riese'}
		// ACT
		await question.insertQuestion(body,'10/11/2019')
		const count = await question.countQuestions()
		// ASSERT
		expect(count).toBe(1)
		done()
	})
})
