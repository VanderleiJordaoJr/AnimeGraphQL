import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'

import Anime from './Anime'

@Entity('genres')
@ObjectType()
export default class Genre extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	@Field(() => [Anime])
	@ManyToMany(() => Anime, (anime) => anime.genres)
	animes!: Promise<Anime[]>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
