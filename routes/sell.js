
import Router from 'koa-router'

const router = new Router({ prefix: '/sell' })

import Items from '../modules/items.js'
const dbName = 'website.db'

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	// console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/sell')
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
	const items = await new Items(dbName)
	const userItems = await items.getUserItems(ctx.session.userID)
	ctx.hbs.userItems = userItems
	try {
		await ctx.render('sell', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})


router.post('/del/:id', async ctx => {
	console.log('called delete')
	const items = await new Items(dbName)
	try {
		await items.delete(ctx.params.id)
		return ctx.redirect('/sell?msg=item deleted')
	} catch (err) {
		console.log(err)
		await ctx.render('error', ctx.hbs)
	} finally {
		items.close()
	}
})

router.post('/update/:id', async ctx => {
	console.log('called update')
	const items = await new Items(dbName)
	try {
		await items.update(ctx.request.body.status, ctx.params.id)
		return ctx.redirect('/sell?msg=item updated')
	} catch (err) {
		console.log(err)
		await ctx.render('error', ctx.hbs)
	} finally {
		items.close()
	}
})

export default router
