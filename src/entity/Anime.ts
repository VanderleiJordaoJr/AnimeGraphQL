import { ManyToOne, PrimaryColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, JoinTable, ManyToMany } from 'typeorm'

import Fansub from './Fansub'
import Genre from './Genre'
import Season from './Season'
import StaffMember from './Staff'
import Studio from './Studio'

export interface IAnime {
	id: number
	name: string
	episodes: number | undefined
	malId: number | undefined
	synopsis: string
	genres: Genre[]
	fansubs: Fansub[]
	studio: Studio | undefined
	season: Season | undefined
	director: StaffMember | undefined
	originalCreator: StaffMember | undefined
}
@Entity('animes')
@ObjectType()
export default class Anime extends BaseEntity {
	@PrimaryColumn()
	@Field(() => ID)
	id!: number

	@Field()
	@Column()
	name!: string

	@Field(() => Int)
	@Column({ nullable: true })
	episodes?: number

	@Field(() => Int)
	@Column({ nullable: true })
	malId?: number

	@Field()
	@Column({ nullable: true })
	synopsis?: string

	@Field(() => [Genre], { nullable: true })
	@JoinTable()
	@ManyToMany(() => Genre, (genre) => genre.animes)
	genres?: Promise<Genre[]>

	@Field(() => [Fansub], { nullable: true })
	@JoinTable()
	@ManyToMany(() => Fansub, (fansub) => fansub.animes)
	fansubs?: Promise<Fansub[]>

	@Field(() => Studio, { nullable: true })
	@ManyToOne(() => Studio, (studio) => studio.animes)
	studio?: Promise<Studio>

	@Field(() => Season, { nullable: true })
	@ManyToOne(() => Season, (season) => season.animes)
	season?: Promise<Season>

	@Field(() => StaffMember, { nullable: true })
	@ManyToOne(() => StaffMember, (staff) => staff.directorAnimes)
	director?: Promise<StaffMember>

	@Field(() => StaffMember, { nullable: true })
	@ManyToOne(() => StaffMember, (staff) => staff.creatorAnimes)
	originalCreator?: Promise<StaffMember>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
