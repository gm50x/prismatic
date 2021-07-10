import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PostService, UserService, CommentService } from '@prismatic/services';
import { Comment } from '@prismatic/graphql/models';
import { BaseResolver } from './base.resolver'

@Resolver((of) => Comment)
export class CommentsResolver extends BaseResolver(Comment) {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {
    super(commentService);
  }

  @ResolveField()
  async author(@Parent() comment: Comment) {
    const { id } = comment;
    return this.userService
      .getAll({
        where: {
          comments: {
            some: { id },
          },
        },
      })
      .then((res) => res.shift());
  }

  @ResolveField()
  async post(@Parent() comment: Comment) {
    const { id } = comment;
    return this.postService
      .getAll({
        where: {
          comments: {
            some: { id },
          },
        },
      })
      .then((res) => res.shift());
  }
}
