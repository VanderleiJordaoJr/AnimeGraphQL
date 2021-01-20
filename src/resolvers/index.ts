import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import AnimeResolver from './AnimeResolver'

export default function getSchema(): Promise<GraphQLSchema> {
	return buildSchema({
		resolvers: [AnimeResolver],
	})
}
