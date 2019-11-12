'use strict'

module.exports = class DbQueries {

	static createUsersTable() {
		return `CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user TEXT, pass TEXT
		);`
	}

	static createQuestionsTable() {
		// TO DO
	}

	static createAnswersTable() {
		return `CREATE TABLE IF NOT EXISTS answers (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			description TEXT NOT NULL,
			total_rate INTEGER,
			rate_counter INTEGER,
			average_rate REAL,
			is_correct INTEGER DEFAULT 0,
			is_inapropriate INTEGER DEFAULT 0,
			user_id INTEGER NOT NULL,
			question_id INTEGER NOT NULL,
			FOREIGN KEY("user_id") REFERENCES "users"("id"),
			FOREIGN KEY("question_id") REFERENCES "questions"("id")
		);`
	}

	static select(select, table, condition) {
		if (condition === undefined) {
			return `SELECT ${select} FROM ${table}`
		}

		return `SELECT ${select} FROM ${table} WHERE ${condition}`
	}
}
