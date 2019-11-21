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
		const body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		const newUser = await user.register(body.name,body.username,body.pass)
		// ASSERT
		expect(newUser).toBe(true)
		done()
	})


	test('Without name', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: '', username: 'TestAccount', pass: 'test123'}
		// ACT
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error('Name cannot be empty'))
		// ASSERT
		expect()
		done()
	})

	test('Without username', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: '', pass: 'test123'}
		// ACT
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error(
			'Username cannot be empty'))
		// ASSERT
		expect()
		done()
	})

	test('Without password', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'TestAccount', pass: ''}
		// ACT
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error(
			'Password cannot be empty'))
		// ASSERT
		expect()
		done()
	})

	test('Username in use', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.username,body.pass)
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error(
			'Username "TestAccount" already in use'))
		// ASSERT
		done()
	})

	test('Username cannot include real name', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'Ben997', pass: 'test123'}
		// ACT
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error(
			'Username cannot include real name'))
		// ASSERT
		done()
	})

	test('Username cannot include spaces', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'TF 997', pass: 'test123'}
		// ACT
		await expect(user.register(body.name,body.username,body.pass)).rejects.toEqual( Error(
			'Username cannot include spaces'))
		// ASSERT
		done()
	})

})

describe('Login()', () => {
	test('Login User', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.username,body.pass)
		await user.login(body.username,body.pass)
		// ASSERT
		expect(1).toBe(1)
		done()
	})

	test('Incorrect Username', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		let body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.username,body.pass)
		body = {username: 'NoAccount', pass: 'test123'}
		await expect(user.login(body.username,body.pass)).rejects.toEqual( Error('Username "NoAccount" not found'))
		// ASSERT
		done()
	})

	test('Incorrect Password', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		let body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.username,body.pass)
		body = {username: 'TestAccount', pass: 'wrongPassword'}
		await expect(user.login(body.username,body.pass)).rejects.toEqual(
			Error('Invalid password for account "TestAccount"'))
		// ASSERT
		done()
	})
})

describe('getLoggedUser()', () => {
	test('retreive user object', async done => {
		expect.assertions(2)
		// ARRANGE
		const user = await new User() // DB runs in-memory if no name supplied
		const body = {name: 'Ben', username: 'TestAccount', pass: 'test123'}
		// ACT
		await user.register(body.name,body.username,body.pass)
		const detail = await user.getLoggedUser(body.username)
		// ASSERT
		expect(detail.name).toBe('Ben')
		expect(detail.username).toBe('TestAccount')
		done()
	})
})

describe('checkAuthorised()', () => {
	test('user is logged in', async done => {
		expect.assertions(1)
		// ARRANGE
		const user = await new User()
		const auth = true
		// ACT
		const loggedIn = await user.checkAuthorised(auth)
		// ASSERT
		expect(loggedIn).toBe(true)
		done()
	})
})
