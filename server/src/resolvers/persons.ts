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
} from 'type-graphql';

import { Person } from '../entities/Person';
import { FieldError } from './../entities/FieldError';

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
      .orderBy('p.createdAt', 'ASC'); // ('p.createdAt' and '"createdAt"' are both valid)

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
    @Arg('patronymic', { nullable: true }) patronymic: string
  ): Promise<PersonResponse> {
    const persons = await Person.find();
    const newPerson = Person.create({ name, surname, patronymic });
    let errors = false;

    persons.forEach((p) => {
      if (this.concattedBIO(p) === this.concattedBIO(newPerson)) {
        errors = true;
      }
    });

    if (errors) {
      return {
        errors: [
          {
            errorType: 'Such person exists',
            message: 'Looks like a person with this BIO already exists...',
          },
        ],
      };
    }
    await newPerson.save();

    return { person: newPerson };
  }

  @Mutation(() => Boolean)
  async deletePerson(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Person.delete(id);
    return true;
  }

  @Mutation(() => PersonResponse, { nullable: true })
  async updatePerson(
    @Arg('id', () => Int) id: number,
    @Arg('name') name: string,
    @Arg('surname') surname: string,
    @Arg('patronymic', { nullable: true }) patronymic: string
  ): Promise<PersonResponse | null> {
    const persons = await Person.find();
    let person = await Person.findOne(id);
    let errors = false;

    if (!person) {
      return {
        errors: [
          {
            errorType: 'Persons doesnt exist',
            message: 'Sorry, we broke smth :) person not found... Reload the page',
          },
        ],
      };
    }

    name ? (person.name = name) : null;
    surname ? (person.surname = surname) : null;
    patronymic ? (person.patronymic = patronymic) : null;

    persons.forEach((p) => {
      if (this.concattedBIO(p) === this.concattedBIO(person!)) {
        errors = true;
      }
    });

    if (errors) {
      return {
        errors: [
          {
            errorType: 'Person with such bio already exists',
            message: 'And you may check it in your list',
          },
        ],
      };
    }

    await person.save();

    return { person };
  }
}
