import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Pass } from './Pass';

@ObjectType()
@Entity()
export class Person extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column()
  name!: string;

  @Field(() => String!)
  @Column()
  surname!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  patronymic: string;

  // Pass one to one
  @Field({ nullable: true })
  @Column({ nullable: true })
  passId: number;

  @OneToOne(() => Pass, (pass) => pass.personId)
  pass: Pass;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
