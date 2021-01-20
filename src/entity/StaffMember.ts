import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity('staff')
export default class StaffMember extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number

	@Field()
	@Column({ unique: true })
	name!: string

	constructor() {
		super()
	}

	toString(): string {
		return JSON.stringify(this)
	}
}
