'use strict';

const Router = require('koa-router');
const router = new Router();

const UserController = require('./controllers/userController');
const QuestionController = require('./controllers/questionController');

router.get('/', async ctx => {
    ctx.body = UserController.hello();
});

router.get('/questions', async ctx => {
    ctx.body = QuestionController.showExample();
});

module.exports = router;