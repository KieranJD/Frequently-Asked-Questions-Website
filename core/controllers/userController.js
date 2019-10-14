'use strict';

const User = require('../models/user');

module.exports = class UserController {
    static hello () {
        let user = new User();
        user.setName('Wallef');
        
        return `Hello ${user.name}`;
    }
};