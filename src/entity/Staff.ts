import { Field, ID, ObjectType } from 'type-graphql'
import { PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'

import Anime from './Anime'

@ObjectType()
@Entity('staff')
export default class Staff extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	@Field(() => [Anime])
	animes!: Promise<Anime[]>

	@OneToMany(() => Anime, (anime) => anime.director)
	directorAnimes!: Promise<Anime[]>

	@OneToMany(() => Anime, (anime) => anime.originalCreator)
	creatorAnimes!: Promise<Anime[]>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
