'use strict'

const User = require('../models/user')

module.exports = class UserController {
	static hello() {
		const user = new User()
		user.setName('Ben')

		return `Hello ${user.name}`
	}

}
