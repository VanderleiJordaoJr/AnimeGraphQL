import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import mercurius from 'mercurius'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { HelloResolver } from './resolvers/HelloResolver'
;(async () => {
	const app = fastify()
	const port = process.env.PORT || 5000
	await createConnection()

	const schema = await buildSchema({
		resolvers: [HelloResolver],
	})

	app.register(fastifyCors)
	app.register(mercurius, { schema })

	await app.listen(port).then(() => {
		console.log(`Listen at ${port}`)
	})
})()
