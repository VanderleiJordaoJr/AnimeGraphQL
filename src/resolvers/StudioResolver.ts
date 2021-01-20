import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Studio from '../entity/Studio'

@Resolver(() => Studio)
export default class StudioResolver {
	@Query(() => Studio, { nullable: true })
	async getStudioById(@Arg('id') id: number): Promise<Studio | undefined> {
		const studio = await Studio.findOne(id)
		return studio
	}

	@Query(() => [Studio])
	async getStudios(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Studio[]> {
		const studio = await Studio.find({ skip, take })
		return studio
	}

	@FieldResolver()
	async animes(
		@Root() studio: Studio,
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Anime[] | undefined> {
		return await Anime.createQueryBuilder('anime')
			.where('anime.studioId = :id', { id: studio.id })
			.skip(skip)
			.take(take)
			.getMany()
	}
}
