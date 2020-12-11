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
	async addDemoItem() {
		const sql = 'INSERT INTO items(name, thumbnail, price, status, userID)\
		VALUES("mona lisa", "https://unsplash.it/500", 500, "for sale", 1)'
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

	async userItem(name, thumbnail, description, price, userID) {
		Array.from(arguments).forEach( val => {
			if(val.length === 0) throw new Error('missing field')
			return false
		})
		const sql = `INSERT INTO items(name, thumbnail, price, description, userID) \
		VALUES("${name}", "${thumbnail}", ${price}, "${description}", ${userID});`
		await this.db.run(sql)
		return true
	}

	async delete(id) {
		const sql = `DELETE FROM items WHERE itemID=${id};`
		await this.db.run(sql)
		return true
	}

	async update(status, id) {
		const sql = `UPDATE items SET status="${status}" WHERE itemID=${id};`
		await this.db.run(sql)
		return true
	}

	async close() {
		await this.db.close()
	}

}

export default Items
