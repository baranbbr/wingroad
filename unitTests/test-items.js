import test from 'ava'
import Items from '../modules/items.js'
import Accounts from '../modules/accounts.js'

test('GET ITEMS : test if items are retrieved from database', async test => {
	test.plan(1)
	const item = await new Items()
	const account = await new Accounts()
	await account.register('asda', 'password', 'asda@gmail.com', '07547123111')
	item.db = account.db

	try {
		await item.addItem('mona lisa', 'http://unsplash.it/500/500', '500', 'for sale', 1)
		const allItems = await item.getItems()
		const itemsLength = Object.keys(allItems).length
		test.is(itemsLength, 1, 'unable to retrieve items') // compare with 6 as there are 6 columns
	} catch(err) {
		test.fail(`error thrown ${err}`)
	} finally {
		await item.close()
	}
})

test('ADD ITEMS : test if items can be added to database', async test => {
	test.plan(1)
	const item = await new Items()
	try {
		const add = await item.addItem('mona lisa', 'http://unsplash.it/500/500', '500', 'for sale', 1)
		test.is(add, true, 'unable to add item')
	} catch(err) {
		test.fail(`error thrown ${err}`)
	} finally {
		await item.close()
	}
})

test('ADD ITEMS : test if items can be added to database with missing input', async test => {
	test.plan(1)
	const item = await new Items()
	try {
		const add = await item.addItem('', 'http://unsplash.it/500/500', '500', 'for sale', 1)
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'missing field', 'incorrect error message')
	} finally {
		await item.close()
	}
})
