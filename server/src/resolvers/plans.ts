import { getConnection } from 'typeorm';
import { GraphQLUpload } from 'apollo-server-express';
import { Resolver, Query, Mutation, Arg, Int, ObjectType, Field } from 'type-graphql';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

import { Plan } from './../entities/Plan';
import { FieldError } from './../entities/typeEntities/FieldError';

import { File } from './../typings/file';

@ObjectType()
class PlanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Plan, { nullable: true })
  plan?: Plan;
}

@Resolver(Plan)
export class PlanResolver {
  @Query(() => [Plan])
  async plans(): Promise<Plan[]> {
    const qb = getConnection()
      .getRepository(Plan)
      .createQueryBuilder('p') // alias
      .leftJoinAndSelect('p.accessPoints', 'accessPoint')
      // .innerJoinAndSelect('p.accessPoints', 'ap', 'ap.plan = p.accessPoints') // not using to test deepest features of Apollo 3
      .orderBy('p.name', 'DESC'); // ('p.createdAt' and '"createdAt"' are both valid)

    const plans = await qb.getMany();

    return plans;
  }

  @Query(() => Plan, { nullable: true })
  async plan(@Arg('id', () => Int) id: number): Promise<Plan | null> {
    const plan = await Plan.findOne(id);
    if (!plan) {
      return null;
    }
    return plan;
  }

  @Mutation(() => PlanResponse)
  async createPlan(@Arg('name') name: string): Promise<PlanResponse> {
    const plans = await Plan.find();
    let duplicatedNameError = false;

    if (name.length < 2) {
      return {
        errors: [
          {
            errorType: "Plan's name is too short",
            message: 'Minimal length is 2 characters :)',
          },
        ],
      };
    }

    plans.forEach((p) => {
      if (p.name === name) {
        duplicatedNameError = true;
      }
    });

    if (duplicatedNameError) {
      return {
        errors: [
          {
            errorType: 'Such plan exists',
            message: 'Looks like a plan with this name already exists... :p',
          },
        ],
      };
    }

    // const qb = await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Plan)
    //   .values({ name })
    //   .returning('*')
    //   .execute();
    // const plan = await qb.raw[0];

    const plan = Plan.create({ name });
    await plan.save();

    return { plan };
  }

  @Mutation(() => String)
  async planPhotoUpload(
    @Arg('file', () => String) file: typeof GraphQLUpload,
    @Arg('id') id: number
  ): Promise<string | null> {
    const { createReadStream, filename, mimetype, encoding } = (await file) as any;
    const plan = await Plan.findOne({ id });

    if (!plan) {
      return null;
    }

    // Create and write file to DB
    const stream = createReadStream();
    const unicFilename = `${filename}-${v4().slice(0, 6)}`;
    const pathname = path.join(__dirname, `/public/images/plans/${unicFilename}`);
    await stream.pipe(fs.createWriteStream(pathname));

    const photoUrl = `${process.env.BACKEND_INDEX}/images/${unicFilename}`;

    plan!.photoUrl = photoUrl;
    await plan.save();

    return photoUrl;
  }

  // @Mutation(() => PlanResponse, { nullable: true })
  // async updatePlan(
  //   @Arg('id', () => Int!) id: number,
  //   @Arg('name', { nullable: true }) name: string,
  //   @Arg('photo', { nullable: true }) photo: string,
  // ): Promise<PlanResponse> {
  //   const plans = await Plan.find();
  //   let plan = await Plan.findOne(id);
  //   let duplicatedBioError = false;
  //   let duplicatedCardNum = false;

  //   if (!plan) {
  //     return {
  //       errors: [
  //         {
  //           errorType: 'Persons doesnt exist',
  //           message: 'Sorry, we broke smth :) plan not found... Reload the page',
  //         },
  //       ],
  //     };
  //   }

  //   name ? (plan.name = name) : null;
  //   surname ? (plan.surname = surname) : null;
  //   patronymic ? (plan.patronymic = patronymic) : null;
  //   card ? (plan.card = card) : null;
  //   state ? (plan.state = state) : null;

  //   plans.forEach((p) => {
  //     if (this.concattedBIO(p) === this.concattedBIO(plan!)) {
  //       duplicatedBioError = true;
  //     }
  //     if (p.card === card) {
  //       duplicatedCardNum = true;
  //     }
  //   });

  //   if (duplicatedBioError) {
  //     return {
  //       errors: [
  //         {
  //           errorType: 'Such plan exists',
  //           message: 'Looks like a plan with this BIO already exists...',
  //         },
  //       ],
  //     };
  //   }

  //   if (duplicatedCardNum) {
  //     return {
  //       errors: [
  //         {
  //           errorType: 'Such card number exists',
  //           message: 'Looks like a plan with this card already exists...',
  //         },
  //       ],
  //     };
  //   }

  //   await plan.save();

  //   return { plan };
  // }

  @Mutation(() => Boolean)
  async deletePlans(@Arg('ids', () => [Int!]!) ids: number[]): Promise<boolean> {
    await Plan.delete(ids);
    return true;
  }
}
