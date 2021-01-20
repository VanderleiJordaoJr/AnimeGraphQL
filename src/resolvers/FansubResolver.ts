import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Fansub from '../entity/Fansub'

@Resolver(() => Fansub)
export default class FansubResolver {
	@Query(() => Fansub, { nullable: true })
	async getFansubById(@Arg('id') id: number): Promise<Fansub | undefined> {
		const fansub = await Fansub.findOne(id)
		return fansub
	}

	@Query(() => [Fansub])
	async getFansubs(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Fansub[]> {
		const fansub = await Fansub.find({ skip, take })
		return fansub
	}

	@FieldResolver()
	async animes(@Root() fansub: Fansub): Promise<Anime[] | undefined> {
		return await fansub.animes
	}
}
