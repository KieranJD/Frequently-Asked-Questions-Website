'use strict'

require('dotenv').config()
const app = require('./server')

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on ${process.env.SERVER_PORT}...`))
