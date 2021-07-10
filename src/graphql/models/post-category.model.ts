import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostCategory {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
