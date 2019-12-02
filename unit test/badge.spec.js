'use strict'
const Question = require('../core/models/question.js')
const badge = require('../core/models/badge.js')

describe('addStars()', () => {
	test('add the bronze, silver or gold flag', async done => {
		expect.assertions(2)
		//ARRANGE
		const question = await new Question()
		await question.__testData()
		const body = {title: 'Mario Cart', body: 'How to unlock mirror'}
		const body1 = {title: 'Super Mario Bros', body: 'How to beat bowser'}
		const body2 = {title: 'Super Mario Bros2', body: 'How to beat bowser2'}
		const session = {user: {id: 1}}
		//ACT
		await question.insertQuestion(body,session, '10/11/2019')
		await question.insertQuestion(body1,session,'09/11/2019')
		await question.insertQuestion(body2,session,'09/11/2019')
		const data = await question.getAllQuestions()
		const bronzeQuestionArray = [1]
		const silverQuestionArray = [2]
		const goldQuestionArray = [3]
		await badge.addStars(data, bronzeQuestionArray, silverQuestionArray, goldQuestionArray)
		//ASSERT
		expect(data[0].bronze).toBe('true')
		expect(data[1].silver).toBe('true')
		done()
	})
})

describe('bronzeQuestions()', () => {
	test('see if a question user has bronze tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: [ {name: 'Wallef'},{name: 'TF997'}],
			silver: '',
			gold: ''
		}
		const question = await new Question()
		await question.__testData()
		const body = {title: 'Mario Cart', body: 'How to unlock mirror'}
		const session = {user: {id: 1}}
		//ACT
		await question.insertQuestion(body,session, '10/11/2019')
		const data = await question.getAllUserId()
		const check = await badge.bronzeQuestions(star, data)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('silverQuestions()', () => {
	test('see if a question user has silver tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: '',
			silver: [ {name: 'Wallef'},{name: 'TF997'}],
			gold: ''
		}
		const question = await new Question()
		await question.__testData()
		const body = {title: 'Mario Cart', body: 'How to unlock mirror'}
		const session = {user: {id: 1}}
		//ACT
		await question.insertQuestion(body,session, '10/11/2019')
		const data = await question.getAllUserId()
		const check = await badge.silverQuestions(star, data)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('goldQuestions()', () => {
	test('see if a question user has gold tag', async done => {
		expect.assertions(1)
		//ARRANGE
		const star = {
			bronze: '',
			silver: '',
			gold: [ {name: 'Wallef'},{name: 'TF997'}]
		}
		const question = await new Question()
		await question.__testData()
		const body = {title: 'Mario Cart', body: 'How to unlock mirror'}
		const session = {user: {id: 1}}
		//ACT
		await question.insertQuestion(body,session, '10/11/2019')
		const data = await question.getAllUserId()
		const check = await badge.goldQuestions(star, data)
		//ASSERT
		expect(check).toStrictEqual([1])
		done()
	})
})

describe('questionStar()', () => {
	test('Remove gold members from silver and silver from bronze', async done => {
		expect.assertions(3)
		//ARRANGE
		const bronze = [1,2,3,4,5]
		const silver = [1,2,3]
		const gold = [1]
		//ACT
		const{bronzeQuestionArray, silverQuestionArray, goldQuestionArray} = await badge
			.questionStar(bronze,silver,gold)
		//ASSERT
		expect(bronzeQuestionArray).toStrictEqual([4,5])
		expect(silverQuestionArray).toStrictEqual([2,3])
		expect(goldQuestionArray).toStrictEqual([1])
		done()
	})
})
