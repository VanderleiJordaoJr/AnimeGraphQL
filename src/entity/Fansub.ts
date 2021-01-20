import { BaseEntity, Column, Entity, ManyToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import Anime from './Anime'

@Entity('fansubs')
export default class Fansub extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ unique: true })
	name!: string

	@Column({ nullable: true })
	link?: string

	@Column({ nullable: true })
	infoAnimeLink?: string

	@ManyToMany(() => Anime, (anime) => anime.fansubs)
	animes?: Anime[]

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
