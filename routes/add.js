
import koaBody from 'koa-body'
import Router from 'koa-router'

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
router.post('/add', koaBody({multipart: true, uploadDir: '.'}),
	async ctx => {
		// const item = await new Items(dbName)
		try {
			// const body = ctx.request.body
			// ctx.hbs.body = ctx.request.body
			const { path, name, type } = ctx.request.files.thumbnail
			console.log(`path: ${path}`)
      		console.log(`filename: ${name}`)
      		console.log(`type: ${type}`)
			// console.log(`name is: ${name}`)
			// await fs.copy(path, `../avatars/${name}`)
			// await item.userItem(body.name, name,
			// 	body.description, body.price, ctx.session.userID)
			return ctx.redirect('/sell?msg=item added')
		} catch (err) {
			console.log(err.message)
			await ctx.render('error', error.message)
		} finally {
			item.close()
		}
})

export default router
