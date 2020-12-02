/** @module Items */

import sqlite from 'sqlite-async'

/**
 * Items
 * ES6 module that handles adding and retrieving items that users want to sell.
 */
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
	/**
	 * retrieves items from database
	 */
	async getItems() {
		const sql = 'SELECT * FROM items'
		const items = await this.db.get(sql)
		// console.log(items)
		return items
	}
	async addDemoItem() {
		const sql = 'INSERT INTO items(name, thumbnail, price, status, userID) VALUES("mona lisa", "https://unsplash.it/500", 500, "for sale", 1)'
		await this.db.run(sql)
	}
	/**
	 * adds a new item
	 * @param {String} name the name of the item being added
	 * @param {String} thumbnail an image of the item being added
	 * @param {Integer} price the price of the item being added
	 * @param {String} status the status (for sale, under offer or sold) of the item
	 * @param {Integer} userID the user adding the item for sale
	 */
	async addItem(name, thumbnail, price, status, userID) {
		Array.from(arguments).forEach( val => {
			if(val.length === 0) throw new Error('missing field')
		})
		const sql = `INSERT INTO items(name, thumbnail, price, status, userID)\
		VALUES("${name}", "${thumbnail}", ${price}, "${status}", ${userID});`
		console.log(sql)
		await this.db.run(sql)
		return true
	}

	async close() {
		await this.db.close()
	}

}

export default Items
