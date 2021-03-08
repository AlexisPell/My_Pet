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
import { FieldError } from './../entities/typeEntities/FieldError';

import { IState } from 'src/typings/pass';

import { personErrorResolver } from './../utils/personsErrorResolver';

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
    @Arg('patronymic') patronymic: string,
    @Arg('card') card: string,
    @Arg('state') state: IState = 'ACTIVE'
  ): Promise<PersonResponse> {
    const persons = await Person.find();
    let duplicatedBioError = false;
    let duplicatedCardNum = false;
    if (card.length < 4 || card.length > 8) return personErrorResolver('CARD_LENGTH_ERROR');

    const person = Person.create({ name, surname, patronymic, card, state });
    persons.forEach((p) => {
      if (this.concattedBIO(p) === this.concattedBIO(person)) {
        duplicatedBioError = true;
      }
      if (p.card === card) {
        duplicatedCardNum = true;
      }
    });
    if (duplicatedBioError) return personErrorResolver('DUPLICATION_NAME_ERROR');
    if (duplicatedCardNum) return personErrorResolver('DUPLICATION_CARD_ERROR');

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
    if (!person) return personErrorResolver('PERSON_DOESNOT_EXIST');

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

    if (duplicatedBioError) return personErrorResolver('DUPLICATION_NAME_ERROR');

    if (duplicatedCardNum) return personErrorResolver('DUPLICATION_CARD_ERROR');

    await person.save();
    return { person };
  }

  @Mutation(() => Boolean)
  async deletePersons(@Arg('ids', () => [Int!]!) ids: number[]): Promise<boolean> {
    await Person.delete(ids);
    return true;
  }
}
