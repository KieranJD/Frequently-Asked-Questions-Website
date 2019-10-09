'use strict'

require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', ctx => ctx.body = `Testing .env!`)

app.use(router.routes());
app.listen(process.env.SERVER_PORT, () => console.log(`Server running on ${process.env.SERVER_PORT}...`));