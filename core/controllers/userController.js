'use strict';

const User = require('../models/user');

module.exports = {
    hello () {
        let user = new User();
        user.setName('Wallef');
        
        return `Hello ${user.name}`;
    }
};