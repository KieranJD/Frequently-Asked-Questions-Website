'use strict'

const User = require('../core/models/user.js')

beforeAll( async() => {
	// stuff to do before any of the tests run
})

afterAll( async() => {
	// runs after all the tests have completed
})

describe('Register()', () => {
	test('Register User', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.pass)
		const count = await user.countUsers()
		// ASSERT
		expect(count).toBe(1)
		done()
	})

	test('Without username', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: '', pass: 'test123'}
		// ACT
		await expect(user.register(body.name,body.pass)).rejects.toEqual( Error('missing username'))
		// ASSERT
		expect()
		done()
	})

	test('Without password', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'TestAccount', pass: ''}
		// ACT
		await expect(user.register(body.name,body.pass)).rejects.toEqual( Error('missing password'))
		// ASSERT
		expect()
		done()
	})

	test('Username in use', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.pass)
		await expect(user.register(body.name,body.pass)).rejects.toEqual( Error('username "TestAccount" already in use'))
		// ASSERT
		done()
	})

})

describe('Login()', () => {
	test('Login User', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.pass)
		await user.login(body.name,body.pass)
		// ASSERT
		expect(1).toBe(1)
		done()
	})

	test('Incorrect Username', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		let body = {name: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.pass)
		body = {name: 'NoAccount', pass: 'test123'}
		await expect(user.login(body.name,body.pass)).rejects.toEqual( Error('username "NoAccount" not found'))
		// ASSERT
		done()
	})

	test('Incorrect Password', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		let body = {name: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.pass)
		body = {name: 'TestAccount', pass: 'wrongPassword'}
		await expect(user.login(body.name,body.pass)).rejects.toEqual( Error('invalid password for account "TestAccount"'))
		// ASSERT
		done()
	})
})
