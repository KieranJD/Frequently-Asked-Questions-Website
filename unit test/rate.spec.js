'use strict'

const Rate = require('../core/models/rate')
const Answer = require('../core/models/answer')
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

	test('Answer with no rates', async done => {
		expect.assertions(1)
		// Arrange
		const rate = await new Rate()
		const request = {
			body: {rate: 5},
			parameters: {answer_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await rate.rateAnswer(request)
		const avg = await rate.averageRate(2)
		// Assert
		expect(avg).toBe(0.0)
		done()
	})
})

describe('updateAnswerRate()', () => {
	test('Update the answer\'s average rate', async done => {
		expect.assertions(1)
		//Arrange
		const rate = await new Rate()
		await rate.__testData()
		// Act
		const update = await rate.updateAnswerRate(1, 4)
		// Assert
		expect(update).toBeTruthy()
		done()
	})
})
