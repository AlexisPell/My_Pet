import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Person } from './Person';
import { Plan } from './Plan';

import { IAcessPointType } from './../typings/acessPointTypes';

@ObjectType()
@Entity()
export class AccessPoint extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column({ unique: true })
  name!: string;

  @Field(() => String!)
  @Column()
  type!: IAcessPointType;

  @Field(() => String!, { nullable: true })
  @Column()
  x!: string;

  @Field(() => String!, { nullable: true })
  @Column()
  y!: string;

  // Person many to many
  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  PersonIds: number[];

  @ManyToMany(() => Person, (person) => person.accessPointIds)
  Persons: Person[];

  // Plan many to one
  @Field(() => Int!)
  @Column()
  planId!: number;

  @ManyToOne(() => Plan, (plan) => plan.accessPoints)
  plan: Plan;

  // Data fields
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
