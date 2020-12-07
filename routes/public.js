
import Router from 'koa-router'
import bodyParser from 'koa-body'

const router = new Router()
router.use(bodyParser({ multipart: true }))

import Accounts from '../modules/accounts.js'
import Items from '../modules/items.js'
const dbName = 'website.db'

/**
 * The home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	const items = await new Items(dbName)
	// items.addDemoItem()
	const allitems = await items.getItems()
	// allitems ? ctx.hbs.items = allitems : ctx.hbs.items = undefined
	ctx.hbs.items = allitems
	console.log(allitems)
	console.log('ctx items is')
	console.log(ctx.hbs.items)

	try {
		await ctx.render('index', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		console.log(ctx.request.body.user)
		await account.register(ctx.request.body.user, ctx.request.body.pass,
			ctx.request.body.email, ctx.request.body.phone)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch (err) {
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		console.log(body)
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in`)
	} catch (err) {
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
