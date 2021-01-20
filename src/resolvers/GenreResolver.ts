import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Genre from '../entity/Genre'

@Resolver(() => Genre)
export default class GenreResolver {
	@Query(() => Genre, { nullable: true })
	async getGenreById(@Arg('id') id: number): Promise<Genre | undefined> {
		const genre = await Genre.findOne(id)
		return genre
	}

	@Query(() => [Genre])
	async getGenres(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Genre[]> {
		const genre = await Genre.find({ skip, take })
		return genre
	}

	@FieldResolver()
	async animes(
		@Root() genre: Genre,
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Anime[] | undefined> {
		return await Anime.createQueryBuilder('anime')
			.leftJoinAndSelect('anime.genres', 'genre')
			.where('genre.id = :id', { id: genre.id })
			.skip(skip)
			.take(take)
			.getMany()
	}
}
