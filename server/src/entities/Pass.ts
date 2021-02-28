import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from './Person';

import { IState } from './../typings/pass';

@ObjectType()
@Entity()
export class Pass extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column({ unique: true })
  card!: string;

  @Field(() => String!)
  @Column()
  state!: IState;

  // Pass one to one
  @Field()
  @Column()
  personId: number;

  @OneToOne(() => Person, (person) => person.passId)
  person: Person;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
