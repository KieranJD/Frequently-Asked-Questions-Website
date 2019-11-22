'use strict'

const Answer = require('../core/models/answer')
beforeAll(async() => {
	// stuff to do
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('Create()', () => {
	test('Create an answer', async done => {
		expect.assertions(1)
		// ARRANGE
		const answer = await new Answer()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// ACT
		const insert = await answer.createAnswer(request, '21/11/2019')
		// ASSERT
		expect(insert).toBeTruthy()
		done()
	})

	test('Empty answer', async done => {
		expect.assertions(1)
		//ARRANGE
		const answer = await new Answer()
		const request = {
			body: {body: ''},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		//ACT & ASSERT
		await expect(answer.createAnswer(request, '21/11/2019')).rejects.toEqual(Error('Answer cannot be empty!'))
		done()
	})
})
