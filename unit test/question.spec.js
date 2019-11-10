'use strict'

const Question = require('../core/models/question.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('insert()', () => {
	test('insert a single question', async done => {
		expect.assertions(3)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		const body = {title: 'Call of Duty World at War', question: 'Where is the pack-a-punch on Der Riese'}
		// ACT
		await question.insertQuestion(body,'10/11/2019')
		const count = await question.countQuestions()
		const data = await question.getAllQuestions()
		// ASSERT
		expect(data[0].title).toBe('Call of Duty World at War')
		expect(data[0].question).toBe('Where is the pack-a-punch on Der Riese')
		expect(count).toBe(1)
		done()
	})

	test('title must not be empty', async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		const body = {title: 'The Witcher 3 Wild Hunt', question: 'Where to find level 1 wolf armour?'}
		//ACT
		await expect(question.insertQuestion(body,'06/11/2019')).rejects.toEqual( Error('Title cannot left be empty') )
		//ASSERT
		expect()
		done()
	})
})

describe('getAll()', () => {
	test('select all from Questions table',async done => {
		expect.assertions(3)
		//ARRANGE
		const question = await new Question()
		const body = {title: 'Mario Cart', question: 'How to unlock mirror'}
		const body1 = {title: 'Super Mario Bros', question: 'How to beat bowser'}
		//ACT
		await question.insertQuestion(body,'10/11/2019')
		await question.insertQuestion(body1,'09/11/2019')
		const count = await question.countQuestions()
		const data = await question.getAllQuestions()
		//ASSERT
		expect(data[0].title).toBe('Mario Cart')
		expect(data[1].title).toBe('Super Mario Bros')
		expect(count).toBe(2)
		done()
	})
})

describe('count()', () => {
	test('count amount of questions in Question table',async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		const body = {title: 'Call of Duty World at War', question: 'Where is the pack-a-punch on Der Riese'}
		const body1 = {title: 'Super Mario Bros', question: 'How to beat bowser'}
		//ACT
		await question.insertQuestion(body,'10/11/2019')
		await question.insertQuestion(body1,'09/11/2019')
		const count = await question.countQuestions()
		//ASSERT
		expect(count).toBe(2)
		done()
	})
})
