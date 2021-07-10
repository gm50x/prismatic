import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

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
