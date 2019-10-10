'use strict'

require('dotenv').config();
const Koa = require('koa');
const router = require('./core/routes');

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on ${process.env.SERVER_PORT}...`));