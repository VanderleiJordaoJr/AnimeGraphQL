import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'
import Anime from './Anime'

export enum ESeason {
	FALL = 'Fall',
	SUMMER = 'Summer',
	SPRING = 'Spring',
	WINTER = 'Winter',
}

@Entity('seasons')
export default class Season extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number

	@Column({ unique: true })
	name!: string

	@Column()
	year!: number

	@Column({
		type: 'enum',
		enum: ESeason,
	})
	season!: ESeason

	@OneToMany(() => Anime, (anime) => anime.season)
	animes!: Anime[]

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
