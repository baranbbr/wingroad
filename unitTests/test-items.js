import test from 'ava'
import Items from '../modules/items.js'

test('GET ITEMS : test if items are retrieved from database', async test => {
	test.plan(1)
	const item = await new Items()
	try {
		const sql = 'INSERT INTO items(name, thumbnail, price, status)\
		VALUES("item", "http://unsplash.it/500/500", 500, "for sale", 4);'
		await this.db.run(sql)
		const items = item.getItems()
		const itemsLength = items.length
		test.is(itemsLength, 1, 'unable to retrieve items')
	} catch(err) {
		test.fail('error thrown')
	} finally {
		await item.close()
	}
})
