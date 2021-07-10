import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field((type) => User)
  author: User;

  @Field((type) => Post)
  post: Post;
}
