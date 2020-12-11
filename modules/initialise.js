// /** @module Initialise */


// import sqlite from 'sqlite-async'
// import Items from './items.js'
// import Accounts from './accounts.js'


// class Init {
// 	/**
//    * Create a home object
//    * @param {String} [dbName=":memory:"] - The name of the database file to use.
//    */
// 	constructor(dbName = ':memory:') {
// 		return (async() => {
// 			this.db = await sqlite.open(dbName)
// 			const sql = 'CREATE TABLE IF NOT EXISTS \
// 			users(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT, phone INTEGER);'
// 			await this.db.run(sql)
// 			// we need this table to store the items of users
// 			const sqlItems = 'CREATE TABLE IF NOT EXISTS items\
// 				(itemID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, thumbnail TEXT, price INTEGER, status TEXT,\
// 				userID INTEGER, description TEXT, uploadtime DATETIME DEFAULT CURRENT_TIMESTAMP,\
// 				FOREIGN KEY (userID) REFERENCES users(id));'
// 			await this.db.run(sqlItems)
// 			return this
// 		})()
// 	}

// 	async createAccounts() {
// 		const account = await new Accounts(dbName)
// 		await account.register('artist1', 'p455w0rd', 'artist1@gmail.com', '0123456789')
// 		await account.register('artist2', 'p455w0rd', 'artist2@gmail.com', '0123456789')
// 		await account.register('buyer1', 'p455w0rd', 'buyer1@gmail.com', '0123456789')
// 		await account.register('buyer2', 'p455w0rd', 'buyer2@gmail.com', '0123456789')
// 		account.close()
// 	}
// 	async demoItems() {
// 		const item = await new Items(dbName)
// 		await item.addDemoItem("Mona Lisa")
// 		await item.addDemoItem("Elizabeth Regina")
// 		await item.addDemoItem("Mobby Dick")
// 		await item.addDemoItem("Frank Lampard")
// 	}
// }

// export default Init
