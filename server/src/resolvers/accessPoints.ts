import { getConnection, getManager } from 'typeorm';
import { Resolver, Query, Mutation, Arg, Int, ObjectType, Field } from 'type-graphql';

import { AccessPoint } from '../entities/AccessPoint';
import { Plan } from './../entities/Plan';
import { Person } from './../entities/Person';
import { FieldError } from './../entities/typeEntities/FieldError';

import { IAcessPointType } from './../typings/acessPointTypes';
import { errorResolver } from './../utils/apErrorResolver';

@ObjectType()
class AccessPointResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => AccessPoint, { nullable: true })
  accessPoint?: AccessPoint;
}

@Resolver(AccessPoint)
export class AccessPointResolver {
  @Query(() => [AccessPoint])
  async accessPoints(
    @Arg('planId', () => Int, { nullable: true }) planId: number
  ): Promise<AccessPoint[]> {
    let aps: AccessPoint[] = [];
    if (planId) {
      aps = await getManager().getRepository(AccessPoint).find({ where: { planId } });
    } else {
      aps = await getManager().getRepository(AccessPoint).find();
    }

    return aps;
  }

  @Query(() => AccessPoint, { nullable: true })
  async accessPoint(@Arg('id', () => Int) id: number): Promise<AccessPoint | null> {
    const accessPoint = await AccessPoint.findOne(id);
    if (!accessPoint) {
      return null;
    }
    return accessPoint;
  }

  @Mutation(() => AccessPointResponse)
  async createAccessPoint(
    @Arg('name') name: string,
    @Arg('type') type: IAcessPointType
  ): Promise<AccessPointResponse> {
    const accessPoints = await AccessPoint.find();
    let duplicatedApName = false;

    if (name.length < 2) return errorResolver('SHORT_NAME_ERROR');
    accessPoints.forEach((ap) => {
      if (ap.name === name) {
        duplicatedApName = true;
      }
    });
    if (duplicatedApName) return errorResolver('DUPLICATION_NAME_ERROR');

    const accessPoint = await AccessPoint.create({ name, type }).save();

    return { accessPoint };
  }

  @Mutation(() => AccessPointResponse, { nullable: true })
  async updateAccessPoint(
    @Arg('id', () => Int!) id: number,
    @Arg('name', { nullable: true }) name: string,
    @Arg('type', { nullable: true }) type: IAcessPointType,
    @Arg('x', () => Int, { nullable: true }) x: number,
    @Arg('y', () => Int, { nullable: true }) y: number,
    @Arg('planId', () => Int, { nullable: true }) planId: number
  ): Promise<AccessPointResponse | null> {
    const persons = await AccessPoint.find();
    let accessPoint = await AccessPoint.findOne(id);
    let duplicatedApName = false;

    if (!accessPoint) return errorResolver('NO_ACCESS_POINT');
    if (name) {
      persons.forEach((ap) => {
        if (ap.name === name && ap.id !== id) {
          duplicatedApName = true;
        }
      });
    }
    if (duplicatedApName) return errorResolver('SUCH_ACCESS_POIN_EXISTS');

    name ? (accessPoint.name = name) : null;
    type ? (accessPoint.type = type) : null;
    x ? (accessPoint.x = x) : (accessPoint.x = null as any);
    y ? (accessPoint.y = y) : (accessPoint.y = null as any);
    if (planId) {
      // const oldPlan = await Plan.findOne(accessPoint.planId);
      const oldPlans = await Plan.find();
      if (oldPlans) {
        oldPlans.forEach(async (plan) => {
          if (plan.accessPointIds.includes(accessPoint!.id)) {
            await Plan.update(
              { id: plan.id },
              { accessPointIds: plan.accessPointIds.filter((ap) => ap !== accessPoint!.id) }
            );
          }
        });
      }

      const newPlan = await Plan.findOne(planId);
      let newApIds: number[] = [];
      if (newPlan?.accessPointIds) {
        newApIds = [...newPlan.accessPointIds, accessPoint!.id];
      } else {
        newApIds = [accessPoint.id];
      }
      await getConnection().transaction(async (em) => {
        await em.query(
          `
          update plan
          set "accessPointIds" = $1
          where "id" = $2
        `,
          [newApIds, planId]
        );
      });
    }

    await accessPoint.save();

    return { accessPoint };
  }

  @Mutation(() => Boolean)
  async deleteAccessPoint(@Arg('id', () => Int!) id: number): Promise<boolean> {
    const accessPoint = await AccessPoint.findOne(id);
    if (!accessPoint) {
      return false;
    }
    if (accessPoint.planId) {
      // remove ap from plan
      const linkedPlan = await Plan.findOne(accessPoint.planId);
      if (linkedPlan?.accessPointIds) {
        linkedPlan.accessPointIds = linkedPlan.accessPointIds.filter(
          (apId) => apId !== accessPoint.id
        );
        linkedPlan.save();
      }
    }
    if (accessPoint.personIds) {
      // remove ap from persons
      const persons = await Person.find();
      persons.map(async (person) => {
        if (accessPoint.personIds.includes(person.id)) {
          await Person.update(
            { id: person.id },
            { accessPointIds: person.accessPointIds.filter((apId) => apId !== accessPoint.id) }
          );
          // person.accessPointIds = person.accessPointIds.filter((apId) => apId !== accessPoint.id);
        }
        return person;
      });
      // check if works
      // await Person.save(persons);
    }
    return true;
  }
}
