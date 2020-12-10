
import Router from 'koa-router'

const router = new Router({ prefix: '/sell' })

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/sell')
	await next()
}

router.use(checkAuth)

router.get('/', async ctx => {
	try {
		await ctx.render('sell', ctx.hbs)
	} catch(err) {
		ctx.hbs.error = err.message
		await ctx.render('error', ctx.hbs)
	}
})

export default router
