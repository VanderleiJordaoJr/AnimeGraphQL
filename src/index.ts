import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import mercurius from 'mercurius'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import getSchema from './resolvers'
;(async () => {
	const app = fastify()
	const port = process.env.PORT || 5000
	await createConnection()

	const schema = await getSchema()

	app.register(fastifyCors)
	app.register(mercurius, { schema })

	await app.listen(port).then(() => {
		console.log(`Listen at ${port}`)
	})
})()
