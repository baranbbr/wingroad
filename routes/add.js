import koaBody from 'koa-body'
import Router from 'koa-router'
import { rename } from 'fs/promises'

const router = new Router()

import Items from '../modules/items.js'
const dbName = 'website.db'

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/sell')
	await next()
}

router.use(checkAuth)

/**
 * The add new item page.
 *
 * @name Add Page
 * @route {GET} /add
 */
router.get('/add', async ctx => {
	try {
		console.log('ctx.hbs')
		console.log(ctx.hbs)
		await ctx.render('add', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * Script to add new items.
 *
 * @name Add Page
 * @route {POST} /add
 */
router.post('/add', async ctx => {
	const item = await new Items(dbName)
	try {
		const { path, name, type } = ctx.request.files.avatar;
		const { itemName, status, description, price } = ctx.request.body
		console.log(ctx.request.body)
		console.log(`path: ${path}`)
		console.log(`filename: ${name}`)
		console.log(`type: ${type}`)
		await rename(path, `public/thumbs/${name}`)
		await item.userItem(itemName, `thumbs/${name}`,
			price, status, ctx.session.userID, description)
		return ctx.redirect('/sell?msg=item added')
		} catch (err) {
			console.log(err.message)
			await ctx.render('error', err.message)
		} finally {
			item.close()
		}
})

export default router
