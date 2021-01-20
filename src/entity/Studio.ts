import { PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'

import Anime from './Anime'

@ObjectType()
@Entity('studios')
export default class Studio extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	@Field(() => [Anime])
	@OneToMany(() => Anime, (anime) => anime.studio)
	animes!: Promise<Anime[]>

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
