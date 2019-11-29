'use strict'

const sqlite = require('sqlite-async')
const bcrypt = require('bcrypt-promise')
const table = require('../dbTables')
const mime = require('mime-types')
const fs = require('fs-extra')
const saltRounds = 10

module.exports = class User {
	/**
	 * Creates a new User
	 * @module User
	 * @classdesc this class allows the user to register, login and upload an avatar.
	 */
	constructor(database = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(database)
			await this.db.run(table.createUsersTable())
			return this
		})()
	}

	/**
	 * @function register
	 * @async
	 * @param {string} name - the real name of the user registering.
	 * @param {string} username - the chosen user name of the user registering.
	 * @param {string} password - the chosen password of the user registering.
	 * Allows the user to register to the website.
	 * Adds the registering users name,user name and passowrd to the users database.
	 * @returns {true} if the user is registerd with no errors.
	 * @returns {Error} If either mandatoryFieldsCheck, checkIfUsernameExists or usernameValidation fails.
	 *
	 * @example
	 *		register('John Smith','ExampleAccount', 'Password')
	 */
	async register(name, username, password) {
		try {
			this.mandatoryFieldsCheck(name, username, password)
			let sql = await this.checkIfUsernameExists('register', username)
			sql = await this.usernameValidation(name, username)
			password = await bcrypt.hash(password, saltRounds)
			sql = `INSERT INTO users(name, username, password) VALUES("${name}", "${username}", "${password}")`

			await this.db.run(sql)
			return true
		} catch(err) {
			throw err
		}
	}

	/** @function login
	 * @async
	 * @param {string} username - the user name of the user logging in.
	 * @param {string} password - the password of the user logging in.
	 * Allows the user to login to the website.
	 * @returns {true} if the user logs in without any errors.
	 * @returns {Error} If either checkIfUsernameExists or checkIfPasswordMatches fails.
	 * @example
	 *		login('ExampleAccount', 'Password')
	 */
	async login(username, password) {
		try {
			let sql = await this.checkIfUsernameExists('login', username)

			sql = `SELECT password FROM users WHERE username = "${username}";`
			const record = await this.db.get(sql)
			await this.checkIfPasswordMatches(password, record, username)

			return true
		} catch(err) {
			throw err
		}
	}

	/** @function getLoggedUser
	 * @async
	 * @param {string} username - the user name of the user logged in.
	 * @returns {string} id, name, user name and the avatar of the user logged in
	 * @example
	 *		getLoggedUser('ExampleAccount')
	 */
	async getLoggedUser(username) {
		return await this.db.get(`SELECT * FROM users WHERE username = "${username}"`)
	}

	/** @function checkIfUsernameExists
	 * @async
	 * @param {string} username - the user name input by the user logging in or trying to register.
	 * @param {string} method - either login or register depending on the context of this function being called.
	 * @returns {Error} `Username "${username}" not found`
	 * if the user name of the user trying to login is not in the database.
	 * @returns {Error} `Username "${username}" already in use`
	 * if the user name of the user trying to register is already in the database.
	 * @example
	 *		checkIfUsernameExists('login', ExampleAccount')
	 */
	async checkIfUsernameExists(method, username) {
		const sql = `SELECT COUNT(id) AS count FROM users WHERE username="${username}";`
		const records = await this.db.get(sql)

		if (method === 'login') {
			if (!records.count) throw new Error(`Username "${username}" not found`)
		} else {
			if (records.count !== 0) throw new Error(`Username "${username}" already in use`)
		}

		return sql
	}

	/** @function checkIfPasswordMatches
	 * @async
	 * @param {string} username - the user name input by the user logging in.
	 * @param {string} record - the password on the database for the user.
	 * @param {string} password - the password input by the user logging in.
	 * @returns {boolean} true if the password provided matches the one on the database.
	 * @example
	 *		checkIfPasswordMatches('ExamplePassword', record, 'ExampleAccount')
	 */
	async checkIfPasswordMatches(password, record, username) {
		const valid = await bcrypt.compare(password, record.password)
		if (valid === false) throw new Error(`Invalid password for account "${username}"`)
	}

	/** @function usernameValidation
	 * @async
	 * @param {string} username - the user name input by the user registering.
	 * @param {string} name - the name input by the user registering.
	 * @returns {Error} if the username includes the users real name or spaces.
	 */
	async usernameValidation(name, username) {
		if (username.toUpperCase().includes(name.toUpperCase())) {
			throw new Error('Username cannot include real name')
		}
		if (username.includes(' ')) {
			throw new Error('Username cannot include spaces')
		}
	}


	/** @function uploadPicture
	 * @async
	 * @param {string} data - the data object of the picture being uploaded.
	 * @param {string} mimeType - the mime type for the extenstion of the file, which is image/png.
	 * @returns {string} The avatarName constant wehich is the path where the image is saved on the server.
	 * @returns {Error} 'Invalid Filetype, file must be PNG' if the file is of a different file type than png.
	 * @example
	 *		uploadPicture(data,'image/png')
	 */
	async uploadPicture(data, mimeType) {
		try{
			const extension = mime.extension(mimeType)
			if(data.filetype.includes('image/png')) {
				const avatarPath = `public/images/user_avatar/${data.userId}/${data.username}.${extension}`
				const avatarName = `images/user_avatar/${data.userId}/${data.username}.${extension}`
				await fs.copy(data.path,avatarPath )
				const sql = `UPDATE users SET avatar = "${avatarName}" WHERE id = ${data.userId}`
				await this.db.run(sql)
				return avatarName
			} else {
				throw new Error('Invalid Filetype, file must be PNG')
			}
		} catch(err) {
			throw err
		}
	}

	async correctAnswer(userID) {
		const sql = `UPDATE users SET score = score + 50 WHERE id = ${userID}`
		await this.db.run(sql)
		return true
	}

	async inappropriateAnswer(userID) {
		const sql = `UPDATE users SET score = score - 5 WHERE id = ${userID}`
		await this.db.run(sql)
		return true
	}

	/** @function mandatoryFieldsCheck
	 * @async
	 * @param {string} name - the name of the user registering.
	 * @param {string} username - the username of the user registering.
	 * @param {string} password -- the password of the user registering.
	 * @returns {Error} ' <name/username/password> cannot be empty' if the length of any of the parameters equals 0.
	 */
	mandatoryFieldsCheck(name, username, password) {
		if (name.length === 0) throw new Error('Name cannot be empty')
		if (username.length === 0) throw new Error('Username cannot be empty')
		if (password.length === 0) throw new Error('Password cannot be empty')
	}
}
