'use strict';

const Router = require('koa-router');
const router = new Router();

const UserController = require('./controllers/userController');

router.get('/', async ctx => {
    ctx.body = UserController.hello();
});

module.exports = router;