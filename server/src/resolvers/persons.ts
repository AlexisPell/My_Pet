import { getConnection } from 'typeorm';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  FieldResolver,
  Root,
  ObjectType,
  Field,
  InputType,
} from 'type-graphql';

import { Person } from '../entities/Person';
import { FieldError } from './../entities/typeEntities/FieldError';

import { IState } from 'src/typings/pass';

@ObjectType()
class PersonResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Person, { nullable: true })
  person?: Person;
}

@Resolver(Person)
export class PersonResolver {
  @FieldResolver(() => String)
  concattedBIO(@Root() person: Person) {
    let { name, surname, patronymic } = person;
    if (!patronymic) patronymic = '';
    const concattedBIO = `${name}${surname}${patronymic}`;
    return concattedBIO;
  }

  @Query(() => [Person])
  async persons(): Promise<Person[]> {
    const qb = getConnection()
      .getRepository(Person)
      .createQueryBuilder('p') // alias
      // .innerJoinAndSelect('p.creator', 'u', 'u.id = p.creatorId') // not using to test deepest features of Apollo 3
      .orderBy('p.createdAt', 'DESC'); // ('p.createdAt' and '"createdAt"' are both valid)

    const persons = await qb.getMany();

    return persons;
  }

  @Query(() => Person, { nullable: true })
  async person(@Arg('id', () => Int) id: number): Promise<Person | null> {
    const person = await Person.findOne(id);
    if (!person) {
      return null;
    }
    return person;
  }

  @Mutation(() => PersonResponse)
  async createPerson(
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('patronymic', { nullable: true }) patronymic: string,
    @Arg('card', { nullable: true }) card: string,
    @Arg('state', { nullable: true }) state: IState = 'ACTIVE'
  ): Promise<PersonResponse> {
    const persons = await Person.find();
    let duplicatedBioError = false;
    let duplicatedCardNum = false;

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

    const person = Person.create({ name, surname, patronymic, card, state });
    persons.forEach((p) => {
      if (this.concattedBIO(p) === this.concattedBIO(person)) {
        duplicatedBioError = true;
      }
      if (p.card === card) {
        duplicatedCardNum = true;
      }
    });

    if (duplicatedBioError) {
      return {
        errors: [
          {
            errorType: 'Such person exists',
            message: 'Looks like a person with this BIO already exists... :p',
          },
        ],
      };
    }

    if (duplicatedCardNum) {
      return {
        errors: [
          {
            errorType: 'Such card number exists',
            message: 'Looks like a person with this card already exists... :p',
          },
        ],
      };
    }

    await person.save();

    return { person };
  }

  @Mutation(() => PersonResponse, { nullable: true })
  async updatePerson(
    @Arg('id', () => Int!) id: number,
    @Arg('name', { nullable: true }) name: string,
    @Arg('surname', { nullable: true }) surname: string,
    @Arg('patronymic', { nullable: true }) patronymic: string,
    @Arg('card', { nullable: true }) card: string,
    @Arg('state', { nullable: true }) state: IState
  ): Promise<PersonResponse | null> {
    const persons = await Person.find();
    let person = await Person.findOne(id);
    let duplicatedBioError = false;
    let duplicatedCardNum = false;

    if (!person) {
      return {
        errors: [
          {
            errorType: 'Persons doesnt exist',
            message: 'Sorry, we broke smth :) person not found... :p',
          },
        ],
      };
    }

    name ? (person.name = name) : null;
    surname ? (person.surname = surname) : null;
    patronymic ? (person.patronymic = patronymic) : null;
    card ? (person.card = card) : null;
    state ? (person.state = state) : null;

    persons.forEach((p) => {
      if (this.concattedBIO(p) === this.concattedBIO(person!)) {
        duplicatedBioError = true;
      }
      if (p.card === card) {
        duplicatedCardNum = true;
      }
    });

    if (duplicatedBioError) {
      return {
        errors: [
          {
            errorType: 'Such person exists',
            message: 'Looks like a person with this BIO already exists... :p',
          },
        ],
      };
    }

    if (duplicatedCardNum) {
      return {
        errors: [
          {
            errorType: 'Such card number exists',
            message: 'Looks like a person with this card already exists... :p',
          },
        ],
      };
    }

    await person.save();

    return { person };
  }

  @Mutation(() => Boolean)
  async deletePerson(@Arg('ids', () => [Int!]!) ids: number[]): Promise<boolean> {
    await Person.delete(ids);
    return true;
  }
}
