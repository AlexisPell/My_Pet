import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { AccessPoint } from './AccessPoint';

import { IState } from './../typings/pass';

@ObjectType()
@Entity()
export class Person extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column()
  name!: string;

  @Field(() => String!)
  @Column()
  surname!: string;

  @Field(() => String!)
  @Column()
  patronymic!: string;

  @Field(() => String!)
  @Column({ unique: true })
  card!: string;

  @Field(() => String!)
  @Column()
  state!: IState;

  @Field(() => String!, { nullable: true })
  @Column({ nullable: true })
  photo: string;

  // Access Point many to many
  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  accessPointIds: number[];

  @ManyToMany(() => AccessPoint, (accessPoint) => accessPoint.personIds)
  accessPoints: AccessPoint[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
