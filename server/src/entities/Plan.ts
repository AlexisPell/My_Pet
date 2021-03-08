import { AccessPoint } from './AccessPoint';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Person } from './Person';

@ObjectType()
@Entity()
export class Plan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String!)
  @Column({ unique: true })
  name!: string;

  @Field(() => String!, { nullable: true })
  @Column({ nullable: true })
  photoUrl: string;

  // AccessPoint one to many
  @Field(() => [Int], { nullable: true })
  @Column('int', { nullable: true, array: true })
  accessPointIds: number[];

  @OneToMany(() => AccessPoint, (accessPoint) => accessPoint.plan)
  accessPoints: AccessPoint[];

  // Data fields
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
