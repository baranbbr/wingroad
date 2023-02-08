/** @module Accounts */

import bcrypt from 'bcrypt-promise'
import { Database } from 'sqlite-async'

const saltRounds = 10

/**
 * Accounts
 * ES6 module that handles registering accounts and logging in.
 */
class Accounts {
	/**
	 * Create an account object
	 * @param {String} [dbName=":memory:"] - The name of the database file to use.
	 */
	constructor(dbName = ':memory:') {
		return (async () => {
			this.db = await Database.open(dbName)
			const sqlItems =
				'CREATE TABLE IF NOT EXISTS items\
				(itemID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumbnail TEXT, price INTEGER, status TEXT,\
				userID INTEGER, description TEXT, uploadtime DATETIME DEFAULT CURRENT_TIMESTAMP,\
				FOREIGN KEY (userID) REFERENCES users(id));'
			await this.db.run(sqlItems)
			// we need this table to store the user accounts
			const sql =
				'CREATE TABLE IF NOT EXISTS \
			users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT, phone VARCHAR(13));'
			await this.db.run(sql)
			return this
		})()
	}

	/**
	 * registers a new user
	 * @param {String} user the chosen username
	 * @param {String} pass the chosen password
	 * @param {String} email the chosen email
	 * @param {Integer} phone phone number of user
	 * @returns {Boolean} returns true if the new user has been added
	 */
	async register(user, pass, email, phone) {
		Array.from(arguments).forEach((val) => {
			if (val.length === 0) throw new Error('missing field')
		})
		const data = await this.db.get(
			'SELECT COUNT(id) as records FROM users WHERE user=?;',
			[user]
		)
		if (data.records !== 0) throw new Error('Username already in use.')
		const emails = await this.db.get(
			'SELECT COUNT(id) as records FROM users WHERE email=?;',
			[email]
		)
		if (emails.records !== 0) throw new Error('Email is already in use.')
		pass = await bcrypt.hash(pass, saltRounds)
		await this.db.run(
			'INSERT INTO users(user, pass, email, phone)\
		VALUES(?, ?, ?, ?)',
			[user, pass, email, phone]
		)
		return true
	}

	/**
	 * checks to see if a set of login credentials are valid
	 * @param {String} username the username to check
	 * @param {String} password the password to check
	 * @returns {Integer} returns id of account
	 */
	async login(username, password) {
		const record = await this.db.get('SELECT id FROM users WHERE user=?;', [
			username,
		])

		if (record === undefined) throw new Error("Username couldn't be found")
		const passRecord = await this.db.get(
			'SELECT pass FROM users WHERE user= ?;',
			[username]
		)
		const valid = await bcrypt.compare(password, passRecord.pass)
		if (valid === false) throw new Error('Account details are incorrect.')
		return record.id
	}
	/**
	 * registers a demo account for the purpose of adding demo items
	 */
	async registerDemoAccount() {
		await this.register('demo', 'demo', 'demo@example.com', '07701111000')
		return true
	}

	async close() {
		await this.db.close()
	}
}

export default Accounts
