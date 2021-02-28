import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class FieldError {
  @Field()
  errorType: string;
  @Field()
  message: string;
}
