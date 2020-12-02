/** @module Items */

// import bcrypt from 'bcrypt-promise'
import sqlite from 'sqlite-async'

class Items {
	/**
   * Create a home object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the items of users
			const sql = 'CREATE TABLE IF NOT EXISTS items\
				(itemID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumbnail TEXT, price INTEGER, status TEXT,\
					 userID INTEGER, FOREIGN KEY (userID) REFERENCES users(id));'
			await this.db.run(sql)
			return this
		})()
	}
	async getItems() {
		const sql = 'SELECT * FROM items;'
		const items = await this.db.get(sql)
		return items
	}

	async close() {
		await this.db.close()
	}

}

export default Items
