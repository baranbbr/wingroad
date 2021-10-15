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
// TODO: keeps hanging on post request
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



// router.post('/upload', async ctx => {
//     const item = await new Items(dbName); const ac = await new Accounts(dbName) // ac - account
//     try {
//         const uf = ctx.request.files.fileUpload; const body = ctx.request.body // uf - uploaded file
//         const st = await file.getUserStorage(ctx.session.userId); const hn = uf.path.match(/[\w-]+$/)
//         // sz - size of the file | x - flag if file can be saved
//         const sz=fs.statSync(`private/${hn}`).size;const x=await ac.checkStorageLimit(ctx.session.userId, sz+st)
//         const referrer = body.referrer || '/dashboard'; if(x) {
//             fs.unlinkSync(`private/${hn}`, err => {
//                 if (err) throw new err
//             })
//             return ctx.redirect(`${referrer}?msg=Storage limit exceeded`)
//         }
//         await file.save(ctx.session.userId, `${uf.path.match(/[\w-]+$/)}`, uf.name, body)
//         return ctx.redirect(`${referrer}?msg=file uploaded successfuly`)
//     } catch(err) {
//         ctx.hbs.msg = err.message;await ctx.render('error', ctx.hbs)
//     } finally {
//         file.close(); ac.close()
//     }
// })

export default router
