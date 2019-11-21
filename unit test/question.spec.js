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
		expect.assertions(1)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		const body = {title: 'Call of Duty World at War', body: 'Where is the pack-a-punch on Der Riese'}
		const session = {user: {id: 0}}
		// ACT
		const check = await question.insertQuestion(body,session,'10/11/2019')
		// ASSERT
		expect(check).toBe(true)
		done()
	})

	test('title must not be empty', async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		const body = {title: '', body: 'Where to find level 1 wolf armour?'}
		//ACT
		await expect(question.insertQuestion(body,'06/11/2019')).rejects.toEqual( Error('Title cannot be left empty') )
		//ASSERT
		expect()
		done()
	})

	test('question must not be empty', async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		const body = {title: 'Lego Star Wars', body: ''}
		//ACT
		//ASSERT
		await expect(question.insertQuestion(body,'05/11/2019')).rejects.toEqual( Error(
			'Question cannot be left empty') )
		done()
	})
	test('title cannot be more than 50 characters', async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		const example = {title: 'Portal 2, how on earth do i talk for this long to get to over 50 characters',
			body: 'How to beat the boss'}
		//ACT
		//ASSERT
		await expect(question.insertQuestion(example,'05/11/2019')).rejects.toEqual( Error(
			'Title cannot be more than 50 characters') )
		done()
	})
})

describe('getAll()', () => {
	test('select all from Questions table',async done => {
		expect.assertions(2)
		//ARRANGE
		const question = await new Question()
		const body = {title: 'Mario Cart', body: 'How to unlock mirror'}
		const body1 = {title: 'Super Mario Bros', body: 'How to beat bowser'}
		const session = {user: {id: 0}}
		//ACT
		await question.insertQuestion(body,session, '10/11/2019')
		await question.insertQuestion(body1,session,'09/11/2019')
		const data = await question.getAllQuestions()
		//ASSERT
		expect(data[0].title).toBe('Mario Cart')
		expect(data[1].title).toBe('Super Mario Bros')
		done()
	})

	test('retrieve all records LIKE query', async done => {
		expect.assertions(2)
		//ARRANGE
		const question = await new Question()
		const query = {search: 'The Legend of Zelda'}
		const body = {title: 'The Legend of Zelda', body: 'How to beat the first boss'}
		const body1 = {title: 'The Witcher 3 Wild Hunt', body: 'How to kill a griffin'}
		const body2 = {title: 'The Legend of Zelda Ocarina of Time', body: 'How to beat the first boss'}
		const session = {user: {id: 0}}
		//ACT
		await question.insertQuestion(body, session, '01/10/2019')
		await question.insertQuestion(body1, session,'07/09/2019')
		await question.insertQuestion(body2, session,'03/04/2019')
		const data = await question.getAllQuestions(query)
		//ASSERT
		expect(data[0].title).toBe('The Legend of Zelda')
		expect(data[1].title).toBe('The Legend of Zelda Ocarina of Time')
		done()
	})
})

describe('Date()', () => {
	test('Correct date', async done => {
		expect.assertions(1)
		//ARRANGE
		const question = await new Question()
		//ACT
		const date = await question.currentDate(new Date('December 17, 1995'))
		//ASSERT
		expect(date).toBe('17/12/1995')
		done()
	})
})
