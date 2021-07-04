import { Args, Int, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { User } from "../models/user.model";
import { Comment } from "../models/comment.model";
import { Post } from "../models/post.model";

import { UserService } from '../../user.service'
import { PostService } from "src/post.service";
import { CommentService } from "src/comment.service";
import { BaseResolver } from "./base.resolver";

@Resolver(of => User)
export class UsersResolver extends BaseResolver(User) {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {
    super(userService);
  }

  @Query(returns => User, { name: 'user', description: 'Queries for the Users and their related data' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.userService.user({ id });
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
    })
  }
}