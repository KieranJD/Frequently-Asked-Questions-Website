'use strict'

require('dotenv').config()
const fs = require('fs-extra')
const Database = require('sqlite-async')

const createArray = async() => {
	const sqlFile = fs.readFileSync(`${__dirname}/seeder.sql`, 'utf-8')
	const array = sqlFile.split('\n')
	return array
}

const run = async() => {
	const db = await Database.open(process.env.DB_NAME)
	const sqlArray = await createArray()
	for (const sql of sqlArray) {
		await db.run(sql)
	}
}

run()
