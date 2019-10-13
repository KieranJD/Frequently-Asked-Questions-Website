'use strict';

require('dotenv').config();
const Koa = require('koa');
const Router = require('./core/routes');

const app = new Koa();

app.use(Router.routes());
app.use(Router.allowedMethods());

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on ${process.env.SERVER_PORT}...`));