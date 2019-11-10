
'use strict'

const ToDo = require('../core/models/question.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('add()', () => {
	// block of tests
	// beforeEach( async() => {
	// 	todo.clear()
	// })
	afterEach( async() => {
		// runs after each test completes
	})
	test('add a single item', async done => {
		expect.assertions(1)
		// ARRANGE
		const todo = await new ToDo() // DB runs in-memory if no name supplied
		// ACT
		await todo.add('bread', 3)
		const count = await todo.countItems()
		// ASSERT
		expect(count).toBe(1)
		done()
	})

	test('qty must be a number', async done => {
		expect.assertions(1)
		const todo = await new ToDo()
		await expect( todo.add('bread', 'three') ).rejects.toEqual( Error('the quantity must be a number') )
		done()
	})

	test('duplicates should increase qty', async done => {
		expect.assertions(2)
		// ARRANGE
		const todo = await new ToDo()
		// ACT
		await todo.add('bread', 4)
		await todo.add('bread', 2)
		const data = await todo.getAll()
		const qty = data[0].qty
		// ASSERT (note there are two assertions as stated on line 42)
		expect(data).toHaveLength(1)
		expect(qty).toEqual(6)
		done()
	})

})

describe('delete()', () => {
	// any tests for the delete() function should be written here
	test('delete should remove given record', async done => {
		expect.assertions(1)
		// ARRANGE
		const todo = await new ToDo()
		// ACT
		await todo.add('apple', 2)
		await todo.add('banana', 4)
		await todo.delete(1)
		// ASSERT
		const count = await todo.countItems()
		expect(count).toBe(1)
		done()
	})
})


describe('getAll()', () => {
	// any tests for the getAll() function should be written here
	test('getAll retrieves all records', async done => {
		expect.assertions()
		// ARRANGE
		const todo = await new ToDo()
		// ACT
		await todo.add('apple', 2)
		await todo.add('banana', 3)
		// ASSERT
		const count = await todo.countItems()
		expect(count).toBe(2)
		done()
	})
})

describe('clear()', () => {
	// any tests for the clear() function should be written here
})
