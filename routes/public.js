
import Router from 'koa-router'
import bodyParser from 'koa-body'

const router = new Router()

import Accounts from '../modules/accounts.js'
import Items from '../modules/items.js'
const dbName = 'website.db'

/**
 * The index page.
 *
 * @name Index Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	const item = await new Items(dbName)
	const allitems = await item.getItems()

	ctx.hbs.items = allitems
	console.log(ctx.hbs)

	try {
		await ctx.render('index', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	} finally {
		item.close()
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

/**
 * The login page.
 *
 * @name Login Page
 * @route {GET} /login
 */
router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

/**
 * The script to authorise login details.
 *
 * @name Login Script
 * @route {POST} /login
 */
router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	try {
		const body = ctx.request.body
		ctx.session.userID = await account.login(body.user, body.pass)
		ctx.session.authorised = true
		// console.log(ctx.session)
		const referrer = body.referrer || '/'
		ctx.hbs.body = ctx.request.body
		return ctx.redirect(`${referrer}?msg=you are now logged in`)
	} catch (err) {
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		account.close()
	}
})

/**
 * Script to deauthorise user.
 *
 * @name Logout Script.
 * @route {GET} /logout
 */
router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

export default router
