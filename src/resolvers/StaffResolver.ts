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
	async animes(@Root() staff: Staff): Promise<Anime[] | undefined> {
		const animes = await staff.directorAnimes
		animes.push(...(await staff.creatorAnimes))
		return animes
	}
}
