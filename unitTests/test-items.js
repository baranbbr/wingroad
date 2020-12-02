import test from 'ava'
import Items from '../modules/items.js'

test('GET ITEMS : test if items are retrieved from database', async test => {
	test.plan(1)
	const item = await new Items()
	try {
		await item.addItem('mona lisa', 'http://unsplash.it/500/500', 500, 'for sale', 2)
		const allItems = await item.getItems()
		const itemsLength = Object.keys(allItems).length
		test.is(itemsLength, 6, 'unable to retrieve items') // compare with 6 as there are 6 columns
	} catch(err) {
		test.fail(`error thrown ${err}`)
	} finally {
		await item.close()
	}
})
