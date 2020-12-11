import Router from 'koa-router'

const router = new Router({ prefix: '/add' })

import Items from '../modules/items.js'
const dbName = 'website.db'

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/sell')
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
	try {
		await ctx.render('add', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})

router.post('/', async ctx => {
	const items = await new Items(dbName)
	const body = ctx.request.body
	try {
		const referrer = body.referrer || '/'
		ctx.hbs.body = ctx.request.body
		return ctx.redirect(`${referrer}?msg=item added`)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	} finally {
		items.close()
	}
})

export default router
