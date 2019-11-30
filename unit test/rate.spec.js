'use strict'

const Rate = require('../core/models/rate')
beforeAll(async() => {
	// stuff to do
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('Rate()', () => {
	test('Rate an answer', async done => {
		expect.assertions(1)
		// Arrange
		const rate = await new Rate()
		const request = {
			body: {rate: 5},
			parameters: {answer_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		const insert = await rate.rateAnswer(request)
		// Assert
		expect(insert).toBeTruthy()
		done()
	})

	test('Bad data', async done => {
		// Arrange
		const rate = await new Rate()
		const request = {
			body: {rate: ''},
			parameters: {answer_id: 1},
			session: {user: {id: 1}}
		}
		// Act & Assert
		await expect(rate.rateAnswer(request)).rejects.toEqual(Error('Rate cannot be empty or a string!'))
		done()
	})
})

describe('averageRate()', () => {
	test('Returning an average rate', async done => {
		expect.assertions(1)
		// Arrange
		const rate = await new Rate()
		const request = {
			body: {rate: 5},
			parameters: {answer_id: 1},
			session: {user: {id: 1}}
		}
		const request2 = {
			body: {rate: 3},
			parameters: {answer_id: 1},
			session: {user: {id: 2}}
		}
		// Act
		await rate.rateAnswer(request)
		await rate.rateAnswer(request2)
		const avg = await rate.averageRate(1)
		// Assert
		expect(avg).toBe(4)
		done()
	})
})
