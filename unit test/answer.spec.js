'use strict'

const Answer = require('../core/models/answer')
beforeAll(async() => {
	// stuff to do
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('insert()', () => {
	test('insert a question', async done => {
		expect.assertions(1)
		// ARRANGE
		const answer = new Answer()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user_id: 1}
		}
		// ACT
		const insert = answer.createQuestion(request, '21/11/2019')
		// ASSERT
		expect(insert).toBeTruthy()
		done()
	})
})
