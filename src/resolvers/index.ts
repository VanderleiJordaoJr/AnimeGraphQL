import { GraphQLSchema } from 'graphql'
import { Max, Min } from 'class-validator'
import { buildSchema, ArgsType, Field, Int } from 'type-graphql'

import AnimeResolver from './AnimeResolver'
import FansubResolver from './FansubResolver'
import GenreResolver from './GenreResolver'
import SeasonResolver from './SeasonResolver'
import StaffResolver from './StaffResolver'
import StudioResolver from './StudioResolver'

@ArgsType()
export class PaginationArgs {
	@Field(() => Int)
	@Min(0)
	skip = 0

	@Field(() => Int)
	@Min(1)
	@Max(50)
	take = 25
}

export default function getSchema(): Promise<GraphQLSchema> {
	return buildSchema({
		resolvers: [
			AnimeResolver,
			FansubResolver,
			GenreResolver,
			SeasonResolver,
			StaffResolver,
			StudioResolver,
		],
	})
}
