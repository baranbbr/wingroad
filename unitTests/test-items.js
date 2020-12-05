import test from 'ava'
import Accounts from '../modules/accounts.js'
import Items from '../modules/items.js'

test('GET ITEMS : test if items are retrieved from database', async test => {
	test.plan(1)
	const item = await new Items()
	const account = await new Accounts()
	try {
		await account.register('doej', 'password', 'doej@gmail.com', '014123122')
		await item.addItem('mona lisa', 'http://unsplash.it/500/500', '500', 'for sale', '1')
		const allItems = await item.getItems()
		const itemsLength = Object.keys(allItems).length
		test.is(itemsLength, 6, 'unable to retrieve items') // compare with 6 as there are 6 columns
	} catch(err) {
		test.fail(`error thrown ${err}`)
	} finally {
		await item.close()
	}
})
