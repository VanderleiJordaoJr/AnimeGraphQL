import { Arg, FieldResolver, Args, Query, Resolver, Root } from 'type-graphql'

import { PaginationArgs } from '.'
import Anime from '../entity/Anime'
import Staff from '../entity/Staff'

@Resolver(() => Staff)
export default class StaffResolver {
	@Query(() => Staff, { nullable: true })
	async getStaffById(@Arg('id') id: number): Promise<Staff | undefined> {
		const staff = await Staff.findOne(id)
		return staff
	}

	@Query(() => [Staff])
	async getStaffs(
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Staff[]> {
		const staff = await Staff.find({ skip, take })
		return staff
	}

	@FieldResolver()
	async animes(
		@Root() staff: Staff,
		@Args(() => PaginationArgs) { skip, take }: PaginationArgs
	): Promise<Anime[] | undefined> {
		return await Anime.createQueryBuilder('anime')
			.where('anime.directorId = :id', { id: staff.id })
			.orWhere('anime.originalCreatorId = :id', { id: staff.id })
			.skip(skip)
			.take(take)
			.getMany()
	}
}
