'use strict';

const Router = require('koa-router');
const router = new Router();

router.get('/', async ctx => {
    ctx.body = `Testing routes file`;
});

module.exports = router;