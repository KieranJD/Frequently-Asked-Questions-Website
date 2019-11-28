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
		// Arrange
		const answer = await new Answer()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		const insert = await answer.createAnswer(request, '21/11/2019')
		// Assert
		expect(insert).toBeTruthy()
		done()
	})

	test('Empty answer', async done => {
		expect.assertions(1)
		// Arrange
		const answer = await new Answer()
		const request = {
			body: {body: ''},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act & Assert
		await expect(answer.createAnswer(request, '21/11/2019')).rejects.toEqual(Error('Answer cannot be empty!'))
		done()
	})
})

describe('getAnswersByQuestion()', () => {
	test('Get all answers from a question', async done => {
		expect.assertions(5)
		// Arrange
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Getting Answers'},
			parameters: {question_id: 3},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const data = await answer.getAnswersByQuestion(request.parameters.question_id)
		// Assert
		expect(data[0].body).toBe('Getting Answers')
		expect(data[0].date).toBe('21/11/2019')
		expect(data[0].question_id).toBe(3)
		expect(data[0].user_id).toBe(1)
		expect(data[0].user_name).toBe('Wallef')
		done()
	})
})
