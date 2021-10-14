
import koaBody from 'koa-body'
import Router from 'koa-router'
import fs from 'fs'

const router = new Router()
// router.use(bodyParser({ formidable: {
// 	uploadDir: '../public/images'
// }}))

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
// TODO: keeps hanging on post request
router.post('/add', koaBody({ multipart: true, uploadDir: '/tmp' }),
	async ctx => {
		const item = await new Items(dbName)
		try {
			const { path, name, type } = ctx.request.files.thumbnail;
			// const { itemName, status, desc, price } = ctx.request.body
			console.log(ctx.request.body)
			console.log(`path: ${path}`)
      		console.log(`filename: ${name}`)
      		console.log(`type: ${type}`)
			// console.log(itemName)
			await fs.copyFile(path, `public/avatars/${name}`)
			// await item.userItem(body.name, name,
			// 	body.description, body.price, ctx.session.userID)
			// return ctx.redirect('/sell?msg=item%20added')
		} catch (err) {
			console.log(err.message)
			await ctx.render('error', err.message)
		} finally {
			item.close()
		}
})

export default router
