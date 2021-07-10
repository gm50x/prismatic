import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PostCategory } from './post-category.model';
import { User } from './user.model';
import { Comment } from './comment.model';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field((type) => Int, { nullable: true })
  upvotes: number;

  @Field((type) => User)
  author: User;

  @Field((type) => PostCategory)
  category: PostCategory;

  @Field((type) => [Comment])
  comments: Comment[];
}
