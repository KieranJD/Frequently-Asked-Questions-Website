'use strict'

const Question = require('../core/models/question.js')
const mock = require('mock-fs')
beforeAll( async() => {
	console.log()
	mock({ 'Questionimage.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'Questiondoc.doc': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'public/images/questions/0/TitleExample.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'public/images/questions/thumb/0/TitleExample.png': Buffer.from([8, 6, 7, 5, 3, 0, 9])
	})
})

afterAll( async() => {
	mock.restore()
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

describe('uploadPicture()', () => {
	test('upload picture', async done => {
		expect.assertions(1)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		let data = {
			title: 'TitleExample',
			filetype: 'image/png',
			path: 'Questionimage.png'
		}
		const expData = {
			title: 'TitleExample',
			filetype: 'image/png',
			path: 'Questionimage.png',
			extension: 'png',
			QuestionId: 0,
			imageName: 'TitleExample.png',
			paths: {
				  filePath: 'public/images/questions/0/TitleExample.png',
				  thumbPath: 'public/images/questions/thumb/0/TitleExample.png'
			}
			  }
		// ACT
		data = await question.uploadPicture(data, 'image/png')
		// ASSERT
		expect(data).toStrictEqual(expData)
		done()
	})

	test('Incorrect file type', async done => {
		expect.assertions(2)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		// ACT
		const data = {
			title: 'TitleExample',
			filetype: 'doc',
			path: 'Questiondoc.doc'
		}
		await expect(question.uploadPicture(data,'image/png')).rejects.toEqual(Error('Invalid Filetype'))
		// ASSERT
		expect(true).toBe(true)
		done()
	})
})

/*
###____CANNOT COVER THIS FUNCTION BECAUSE SHARP DOESNT WORK WITH JEST____###
describe('savePicture()', () => {
	test('save picture', async done => {
		expect.assertions(2)
		// ARRANGE
		const question = await new Question() // DB runs in-memory if no name supplied
		// ACT
		const data = {
			data: {
				  title: 'TitleExample',
				  filetype: 'image/png',
				  path: 'Questionimage.png'
			},
			paths: {
				  filePath: 'public/images/questions/0/TitleExample.png',
				  thumbPath: 'public/images/questions/thumb/0/TitleExample.png'
			},
			extension: 'png',
			QuestionId: 0
			  }
		await question.savePicture(data)
		// ASSERT
		expect(true).toBe(true)
		done()
	})
})
*/