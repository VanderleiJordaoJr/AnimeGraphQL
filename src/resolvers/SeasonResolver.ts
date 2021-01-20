import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Season from '../entity/Season'

@Resolver(() => Season)
export default class SeasonResolver {
	@Query(() => Season, { nullable: true })
	async getSeasonById(@Arg('id') id: number): Promise<Season | undefined> {
		const season = await Season.findOne(id)
		return season
	}

	@Query(() => [Season])
	async getSeasons(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Season[]> {
		const season = await Season.find({ skip, take })
		return season
	}

	@FieldResolver()
	async animes(
		@Root() season: Season,
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Anime[] | undefined> {
		return await Anime.createQueryBuilder('anime')
			.where('anime.seasonId = :id', { id: season.id })
			.skip(skip)
			.take(take)
			.getMany()
	}
}
