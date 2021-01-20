import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'

import Anime from './Anime'

@Entity('fansubs')
@ObjectType()
export default class Fansub extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	@Field()
	@Column({ nullable: true })
	link?: string

	@Field()
	@Column({ nullable: true })
	infoAnimeLink?: string

	@Field(() => [Anime])
	@ManyToMany(() => Anime, (anime) => anime.fansubs, { lazy: true })
	animes?: Promise<Anime[]>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
