'use strict'

module.exports = class dbTables {

	static createUsersTable() {
		return `CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			username TEXT NOT NULL,
			password TEXT NOT NULL,
			avatar TEXT DEFAULT "default-avatar.jpg",
			score INTEGER DEFAULT 0
		);`
	}

	static createQuestionsTable() {
		return `CREATE TABLE IF NOT EXISTS questions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			body TEXT NOT NULL,
			image TEXT,
			date TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			FOREIGN KEY("user_id") REFERENCES "users"("id")
		);`
	}

	static createAnswersTable() {
		return `CREATE TABLE IF NOT EXISTS answers (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			body TEXT NOT NULL,
			average_rate REAL DEFAULT 0.0,
			is_correct INTEGER DEFAULT 0,
			is_inapropriate INTEGER DEFAULT 0,
			date TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			question_id INTEGER NOT NULL,
			FOREIGN KEY("user_id") REFERENCES "users"("id"),
			FOREIGN KEY("question_id") REFERENCES "questions"("id")
		);`
	}

	static createRatesTable() {
		return `CREATE TABLE IF NOT EXISTS rates (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			rate INTEGER NOT NULL,
			answer_id INTEGER NOT NULL,
			FOREIGN KEY("answer_id") REFERENCES "answers"("id")
		);`
	}

	static select(select, table, condition) {
		if (condition === undefined) {
			return `SELECT ${select} FROM ${table}`
		}

		return `SELECT ${select} FROM ${table} WHERE ${condition}`
	}
}
