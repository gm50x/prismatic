import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { UserService, PostService, CommentService } from '@prismatic/services';
import { User } from '@prismatic/graphql/models';
import { BaseResolver } from './base.resolver';

@Resolver((of) => User)
export class UsersResolver extends BaseResolver(User) {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {
    super(userService);
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postService.getPosts({
      where: {
        author: { id },
      },
    });
  }

  @ResolveField()
  async comments(@Parent() user: User) {
    const { id } = user;
    return this.commentService.getComments({
      where: {
        author: { id },
      },
    });
  }
}
