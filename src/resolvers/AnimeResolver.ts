import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Fansub from '../entity/Fansub'
import Genre from '../entity/Genre'
import Season from '../entity/Season'
import Staff from '../entity/Staff'
import Studio from '../entity/Studio'

@Resolver(() => Anime)
export default class AnimeResolver {
	@Query(() => Anime, { nullable: true })
	async getAnimeById(@Arg('id') id: number): Promise<Anime | undefined> {
		const anime = await Anime.findOne(id)
		return anime
	}

	@Query(() => [Anime])
	async getAnimes(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Anime[]> {
		const animes = await Anime.find({ skip, take })
		return animes
	}

	@FieldResolver()
	async genres(@Root() anime: Anime): Promise<Genre[] | undefined> {
		return await anime.genres
	}

	@FieldResolver()
	async fansubs(@Root() anime: Anime): Promise<Fansub[] | undefined> {
		return await anime.fansubs
	}

	@FieldResolver()
	async season(@Root() anime: Anime): Promise<Season | undefined> {
		return await anime.season
	}

	@FieldResolver()
	async studio(@Root() anime: Anime): Promise<Studio | undefined> {
		return await anime.studio
	}

	@FieldResolver()
	async originalCreator(@Root() anime: Anime): Promise<Staff | undefined> {
		return await anime.originalCreator
	}

	@FieldResolver()
	async director(@Root() anime: Anime): Promise<Staff | undefined> {
		return await anime.director
	}
}
