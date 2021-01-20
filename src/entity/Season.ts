import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'

import Anime from './Anime'

export enum ESeason {
	FALL = 'Fall',
	SUMMER = 'Summer',
	SPRING = 'Spring',
	WINTER = 'Winter',
}

@ObjectType()
@Entity('seasons')
export default class Season extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	@Column()
	@Field(() => Int)
	year!: number

	@Column({
		type: 'enum',
		enum: ESeason,
	})
	@Field(() => String)
	season!: ESeason

	@Field(() => [Anime])
	@OneToMany(() => Anime, (anime) => anime.season)
	animes!: Promise<Anime[]>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
