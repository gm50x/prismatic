import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import {
  CommentService,
  PostService,
  PostCategoryService,
  UserService,
} from '@prismatic/services';

import { Post } from '@prismatic/graphql/models';
import { BaseResolver } from './base.resolver';

@Resolver((of) => Post)
export class PostsResolver extends BaseResolver(Post) {
  constructor(
    private readonly postService: PostService,
    private readonly postCategoryService: PostCategoryService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {
    super(postService);
  }

  @Mutation((returns) => Post, { name: 'upvotePost' })
  async upvotePost(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postService.upvoteById({ id });
  }

  @Mutation((returns) => Post, { name: 'createPost' })
  async createPost(
    @Args({ name: 'title' }) title: string,
    @Args({ name: 'content' }) content: string,
    @Args({ name: 'category', type: () => Int }) category: number,
    @Args({ name: 'authorEmail' }) authorEmail: string,
  ) {
    return this.postService.create({
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        },
      },
      category: {
        connect: {
          id: category,
        },
      },
    });
  }

  @ResolveField()
  async author(@Parent() post: Post) {
    const { id } = post;
    return this.userService
      .getAll({
        where: {
          posts: {
            some: { id },
          },
        },
      })
      .then((res) => res.shift());
  }

  @ResolveField()
  async comments(@Parent() post: Post) {
    const { id } = post;
    return this.commentService.getAll({
      where: {
        post: { id },
      },
    });
  }

  @ResolveField()
  async category(@Parent() post: Post) {
    const { id } = post;
    return this.postCategoryService.getAll({
      where: {
        posts: {
          some: { id },
        },
      },
    });
  }
}
