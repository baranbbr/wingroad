/** @module Sell */

import sqlite from 'sqlite-async'
import Items from './items.js'

const dbName = 'website.db'

/**
 * Items
 * ES6 module that handles updating and deleting items that users want to sell.
 */
class Sell {
	/**
   * Create an object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS \
			users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT, phone INTEGER);'
			await this.db.run(sql)
			// we need this table to store the items of users
			const sqlItems = 'CREATE TABLE IF NOT EXISTS items\
				(itemID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumbnail TEXT, price INTEGER, status TEXT,\
				userID INTEGER, uploadtime DATETIME DEFAULT CURRENT_TIMESTAMP,\
				FOREIGN KEY (userID) REFERENCES users(id));'
			await this.db.run(sqlItems)
			return this
		})()
	}

	async setStatus(id) {
		const selectValues = document.getElementById('statuses')
		const items = await new Items(dbName)
		const userItems = await items.getUserItems(id)
		// userItems.forEach(value => {
		// 	if(value == userItems)
		// }) 
	}
}