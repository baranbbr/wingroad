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
			const sql = 'CREATE TABLE IF NOT EXISTS \
			users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT, phone INTEGER);'
			await this.db.run(sql)
			// we need this table to store the items of users
			const sqlItems = 'CREATE TABLE IF NOT EXISTS items\
				(itemID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumbnail TEXT, price INTEGER, status TEXT,\
				userID INTEGER, description TEXT, uploadtime DATETIME DEFAULT CURRENT_TIMESTAMP,\
				FOREIGN KEY (userID) REFERENCES users(id));'
			await this.db.run(sqlItems)
			return this
		})()
	}
	/**
	 * retrieves all items from table items as well as which user added item
	 */
	async getItems() {
		const sql = 'SELECT items.*, users.user, users.phone FROM items, users ORDER BY uploadtime DESC'
		const items = await this.db.all(sql)
		return items
	}
	/**
	 * retrieves all items that are listed by the current logged in user
	 */
	async getUserItems(id) {
		const sql = `SELECT * FROM items WHERE userID=${id} ORDER BY uploadtime`
		const items = await this.db.all(sql)
		return items
	}
	/**
	* adds a new demo item with pre-set values
	@param {String} name name of the item
	 */
	async addDemoItem(name) {
		const sql = `INSERT INTO items(name, thumbnail, price, status, userID)\
		VALUES("${name}", "https://unsplash.it/500", 500, "for sale", 1)`
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
			return false
		})
		const sql = `INSERT INTO items(name, thumbnail, price, status, userID) \
		VALUES("${name}", "${thumbnail}", ${price}, "${status}", ${userID});`
		await this.db.run(sql)
		return true
	}
	/**
	 * adds a new user item (with description)
	 * @param {String} name the name of the item being added
	 * @param {String} thumbnail an image of the item being added
	 * @param {String} description description of item
	 * @param {Integer} price the price of the item being added
	 * @param {Integer} userID the user adding the item for sale
	 */
	async userItem(name, thumbnail, description, price, userID) {
		Array.from(arguments).forEach( val => {
			if(val.length === 0) throw new Error('missing field')
			return false
		})
		const sql = `INSERT INTO items(name, thumbnail, price, description, status, userID) \
		VALUES("${name}", "${thumbnail}", ${price}, "${description}", "for sale", ${userID});`
		await this.db.run(sql)
		return true
	}
	/**
	 * deletes an item
	 * @param {Integer} id id of the item being deleted
	 */
	async delete(id) {
		const sql = `DELETE FROM items WHERE itemID=${id};`
		await this.db.run(sql)
		return true
	}

	/**
	 * upates the status of an item
	 * @param {String} status new status of the item
	 * @param {Integer} id id of the item being deleted
	*/
	async update(status, id) {
		const sql = `UPDATE items SET status="${status}" WHERE itemID=${id};`
		await this.db.run(sql)
		return true
	}
	/**
	 * closes connection to database
	*/
	async close() {
		await this.db.close()
	}
}

export default Items
