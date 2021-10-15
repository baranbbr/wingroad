
import Router from 'koa-router'
import koaBody from 'koa-body'

import publicRouter from './public.js'
import secureRouter from'./sell.js'
import addRouter from './add.js'

const mainRouter = new Router()
mainRouter.use(koaBody({
	formidable: {uploadDir: 'public/thumbs'},
	multipart: true,
	urlencoded: true
}))

const nestedRoutes = [publicRouter, secureRouter, addRouter]
for (const router of nestedRoutes) {
	mainRouter.use(router.routes())
	mainRouter.use(router.allowedMethods())
}

export default mainRouter
