import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.model';
import { Comment } from './comment.model';

@ObjectType()
export class User {

  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  password: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(type => [Post])
  posts: Post[];

  @Field(type => [Comment])
  comments: Post[];
}
