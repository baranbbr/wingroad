
import Router from 'koa-router'
import bodyParser from 'koa-body'
import fs from 'fs'
import os from 'os'
import path from 'path'

const router = new Router()
// router.use(bodyParser({ formidable: {
// 	uploadDir: '../public/images'
// }}))

import Accounts from '../modules/accounts.js'
import Items from '../modules/items.js'
const dbName = 'website.db'

async function checkAuth(ctx, next) {
	console.log('secure router middleware')
	console.log(ctx.hbs)
	if(ctx.hbs.authorised !== true) return ctx.redirect('/login?msg=you need to log in&referrer=/sell')
	await next()
}

router.use(checkAuth)

router.get('/add', async ctx => {
	try {
		await ctx.render('add', ctx.hbs)
	} catch (err) {
		await ctx.render('error', ctx.hbs)
	}
})

router.post('/add', async ctx => {
	const item = await new Items(dbName)
	try {
		const body = ctx.request.body
		ctx.hbs.body = ctx.request.body
		console.log(body)
		console.log('hi')
		await item.userItem(body.name, body.thumbnail, 
			body.description, body.price, ctx.session.userID)
		return ctx.redirect('/sell?msg=item added')
	} catch (err) {
		console.log(err)
		await ctx.render('error', ctx.hbs)
	} finally {
		item.close()
	}
})



export default router
