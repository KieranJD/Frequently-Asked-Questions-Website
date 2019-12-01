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


describe('getUserID()', () => {
	test('get userID from answer', async done => {
		expect.assertions(1)
		// Arrange
		const answer = await new Answer()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const userID = await answer.getUserID('1')
		// Assert
		expect(userID).toBe(1)
		done()
	})
})

describe('isCorrect()', () => {
	test('Change question to solved', async done => {
		expect.assertions(1)
		//ARRANGE
		const answer = await new Answer() // DB runs in-memory if no name supplied
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// ACT
		await answer.createAnswer(request, '21/11/2019')
		const check = await answer.isCorrect(1)
		//ASSERT
		expect(check).toBeTruthy()
		done()
	})
})

describe('isInappropriate()', () => {
	test('Change question to solved', async done => {
		expect.assertions(1)
		//ARRANGE
		const answer = await new Answer() // DB runs in-memory if no name supplied
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// ACT
		await answer.createAnswer(request, '21/11/2019')
		const check = await answer.isInappropriate(1)
		//ASSERT
		expect(check).toBeTruthy()
		done()
	})
})


describe('addStars()', () => {
	test('add the bronze, silver or gold flag', async done => {
		expect.assertions(2)
		//ARRANGE
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 3},
			session: {user: {id: 1}}
		}
		const request1 = {
			body: {body: 'Test1'},
			parameters: {question_id: 3},
			session: {user: {id: 1}}
		}
		const request2 = {
			body: {body: 'Test2'},
			parameters: {question_id: 3},
			session: {user: {id: 1}}
		}
		//ACT
		await answer.createAnswer(request, '21/11/2019')
		await answer.createAnswer(request1, '21/11/2019')
		await answer.createAnswer(request2, '21/11/2019')
		const data = await answer.getAnswersByQuestion(3)
		console.table(data)
		const bronzeAnswerArray = [1]
		const silveranswerArray = [2]
		const goldAnswerArray = [3]
		const stars = await answer.addStars(data, bronzeAnswerArray, silveranswerArray, goldAnswerArray)
		console.table(stars)
		//ASSERT
		expect(data[0].bronze).toBe('true')
		expect(data[1].silver).toBe('true')
		done()
	})
})

describe('getAllUserId()', () => {
	test('get the userId for a answer', async done => {
		expect.assertions(2)
		//ARRANGE
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const user = await answer.getAllUserId()
		//ASSERT
		expect(user[0].id).toBe(1)
		expect(user[0].user_name).toBe('Wallef')
		done()
	})
})

describe('bronzeAnswer()', () => {
	test('see if a answer user has bronze tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: [ {name: 'Wallef'},{name: 'TF997'}],
			silver: '',
			gold: ''
		}
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const check = await answer.bronzeAnswers(star)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('silverAnswer()', () => {
	test('see if a answer user has silver tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: '',
			silver: [ {name: 'Wallef'},{name: 'TF997'}],
			gold: ''
		}
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const check = await answer.silverAnswers(star)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('goldAnswer()', () => {
	test('see if a answer user has gold tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: '',
			silver: '',
			gold: [ {name: 'Wallef'},{name: 'TF997'}]
		}
		const answer = await new Answer()
		await answer.__testData()
		const request = {
			body: {body: 'Test'},
			parameters: {question_id: 1},
			session: {user: {id: 1}}
		}
		// Act
		await answer.createAnswer(request, '21/11/2019')
		const check = await answer.goldAnswers(star)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('answerStar()', () => {
	test('Remove gold members from silver and silver from bronze', async done => {
		expect.assertions(3)
		//ARRANGE
		const answer = await new Answer()
		const bronze = [1,2,3,4,5]
		const silver = [1,2,3]
		const gold = [1]
		//ACT
		const{bronzeAnswersArray, silverAnswersArray, goldAnswersArray} = await answer
			.answerStar(bronze,silver,gold)
		//ASSERT
		expect(bronzeAnswersArray).toStrictEqual([4,5])
		expect(silverAnswersArray).toStrictEqual([2,3])
		expect(goldAnswersArray).toStrictEqual([1])
		done()
	})
})
