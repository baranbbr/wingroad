/** @module Items */

import sqlite from 'sqlite-async'
import Accounts from './accounts.js'

const dbName = 'website.db'
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
		return (async () => {
			this.db = await sqlite.open(dbName)
			const sql =
				'CREATE TABLE IF NOT EXISTS \
			users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT, phone INTEGER);'
			await this.db.run(sql)
			// we need this table to store the items of users
			const sqlItems =
				'CREATE TABLE IF NOT EXISTS items\
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
		const sql =
			'SELECT items.*, users.user, users.phone\
		FROM items, users WHERE items.userID=users.id ORDER BY uploadtime DESC'
		let items = await this.db.all(sql)
		console.log(`items are: ${items}`)
		console.log(`items length: ${items.length}`)

		if (items.length === 0) {
			const account = await new Accounts(dbName)
			await account.registerDemoAccount()
			for (let i = 0; i <= 5; i++) {
				await this.addDemoItem(`Demo item ${i}`)
			}
		}
		items = await this.db.all(sql)
		return items
	}
	/**
	 * retrieves all items that are listed by the current logged in user
	 */
	async getUserItems(id) {
		const items = await this.db.all(
			'SELECT * FROM items WHERE userID=? ORDER BY uploadtime',
			[id]
		)
		return items
	}
	/**
	* adds a new demo item with pre-set values and a random image
	@param {String} name name of the item
	 */
	async addDemoItem(name) {
		const randomimgSize = Math.floor(Math.random() * (550 - 450) + 450)
		const randomPrice = Math.floor(Math.random() * (1000 - 10) + 10)
		const descriptions = [
			'Just painted get it now!',
			'Took me 50 hours.',
			"This piece is one of my best, I'm really proud of it.",
			"This took me 3 hours to create, it's my best yet.",
		]
		const randomDesc =
			descriptions[Math.floor(Math.random() * descriptions.length)]

		await this.userItem(
			name,
			`https://unsplash.it/${randomimgSize}`,
			randomPrice,
			'for sale',
			1,
			randomDesc
		)
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
		Array.from(arguments).forEach((val) => {
			if (val.length === 0) throw new Error('missing field')
			return false
		})
		await this.db.run(
			'INSERT INTO items(name, thumbnail, price, status, userID)\
		VALUES(?, ?, ?, ?, ?);',
			[name, thumbnail, price, status, userID]
		)
		return true
	}
	/**
	 * adds a new user item (with description)
	 * @param {String} name the name of the item being added
	 * @param {String} thumbnail an image of the item being added
	 * @param {String} status status of the item
	 * @param {Integer} price the price of the item being added
	 * @param {Integer} userID the user adding the item for sale
	 * @param {String} description description of item
	 */
	async userItem(name, thumbnail, price, status, userID, description) {
		Array.from(arguments).forEach((val) => {
			if (val.length === 0) throw new Error('missing field')
			return false
		})
		await this.db.run(
			'INSERT INTO items(name, thumbnail, price, status, userID, description) \
		VALUES(?, ?, ?, ?, ?, ?);',
			[name, thumbnail, price, status, userID, description]
		)
		return true
	}
	/**
	 * deletes an item
	 * @param {Integer} id id of the item being deleted
	 */
	async delete(id) {
		await this.db.run('DELETE FROM items WHERE itemID=?;', [id])
		return true
	}

	/**
	 * upates the status of an item
	 * @param {String} status new status of the item
	 * @param {Integer} id id of the item being deleted
	 */
	async update(status, id) {
		await this.db.run('UPDATE items SET status=? WHERE itemID=?;', [
			status,
			id,
		])
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
