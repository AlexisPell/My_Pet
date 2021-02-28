import { Person } from './../entities/Person';
import { getConnection } from 'typeorm';
import { Resolver, Query, Mutation, Arg, Int, ObjectType, Field } from 'type-graphql';

import { Pass } from '../entities/Pass';
import { FieldError } from './../entities/FieldError';

import { IState } from './../typings/pass';

@ObjectType()
class PassResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Pass, { nullable: true })
  pass?: Pass;
}

@Resolver(Pass)
export class PassResolver {
  @Query(() => [Pass])
  async passes(): Promise<Pass[]> {
    const qb = getConnection()
      .getRepository(Pass)
      .createQueryBuilder('p') // alias
      // .innerJoinAndSelect('p.creator', 'u', 'u.id = p.creatorId')
      // not using to test deepest features of Apollo 3
      // like concatting 2 entities in makeVar
      .orderBy('p.createdAt', 'DESC'); // ('p.createdAt' and '"createdAt"' are both valid)

    const passes = await qb.getMany();

    return passes;
  }

  @Query(() => Pass, { nullable: true })
  async pass(@Arg('id', () => Int) id: number): Promise<Pass | null> {
    const pass = await Pass.findOne(id);
    if (!pass) {
      return null;
    }
    return pass;
  }

  @Mutation(() => PassResponse)
  async createPass(
    @Arg('personId', () => Int!) personId: number,
    @Arg('card', () => String!) card: string,
    @Arg('state', () => String!) state: IState
  ): Promise<PassResponse> {
    const passes = await Pass.find();
    const person = await Person.findOne(personId);
    const pass = Pass.create({ card, state, personId });
    let errors = false;

    if (card.length < 4 || card.length > 8) {
      return {
        errors: [
          {
            errorType: 'Pass is of unacceptable length',
            message: "Sorry, password's length must be in space from 4 to 8",
          },
        ],
      };
    }

    if (!person) {
      return {
        errors: [
          {
            errorType: 'Person was not found...',
            message: 'Cannot add pass to unexisting person :)',
          },
        ],
      };
    }

    if (person.passId) {
      return {
        errors: [
          {
            errorType: 'Person already has a card',
            message: 'But you may update it instead',
          },
        ],
      };
    }

    passes.forEach((p) => {
      if (p.card === card) {
        errors = true;
      }
    });

    if (errors) {
      return {
        errors: [
          {
            errorType: 'Pass with such number already exists',
            message: 'And you may check it in your list',
          },
        ],
      };
    }

    await pass.save();

    person.passId = pass.id;

    console.log('pass: ', pass);

    await Person.update({ id: personId }, { passId: pass.id });

    return { pass };
  }

  @Mutation(() => Boolean)
  async deletePass(@Arg('id', () => Int) id: number): Promise<boolean> {
    const pass = await Pass.findOne(id);
    await Person.update({ id: pass?.personId }, { passId: null as any });
    await Pass.delete(id);
    return true;
  }

  @Mutation(() => PassResponse, { nullable: true })
  async updatePass(
    @Arg('id', () => Int) id: number,
    @Arg('card', () => String, { nullable: true }) card: string,
    @Arg('state', { nullable: true }) state: IState
  ): Promise<PassResponse> {
    const passes = await Pass.find();
    let pass = await Pass.findOne(id);
    let errors = false;

    if (!pass) {
      return {
        errors: [
          {
            errorType: 'Pass does not exist',
            message: 'Sorry, we broke smth :) pass not found... Reload the page',
          },
        ],
      };
    }

    if (card.toString().length < 4 || card.toString.length > 8) {
      return {
        errors: [
          {
            errorType: 'Pass is of unacceptable length',
            message: "Sorry, password's length must be in space from 4 to 8",
          },
        ],
      };
    }

    passes.forEach((p) => {
      if (p.card === card) {
        errors = true;
      }
    });

    if (errors) {
      return {
        errors: [
          {
            errorType: 'Pass with such number already exists',
            message: 'And you may check it in your list',
          },
        ],
      };
    }

    card ? (pass.card = card) : null;
    state ? (pass.state = state) : null;
    await pass.save();

    return { pass };
  }
}
