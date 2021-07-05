import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { BaseResolver } from './base.resolver';
import { Comment } from '../models/comment.model';
import { Post } from "../models/post.model";
import { PostService } from "src/post.service";
import { UserService } from "src/user.service";
import { User } from "../models/user.model";
import { CommentService } from "src/comment.service";

@Resolver(of => Comment)
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
    const { id } = comment
    return this.userService.getAll({
      where: {
        comments: {
          some: { id }
        }
      }
    }).then(res => res.shift())
  }

  @ResolveField()
  async post(@Parent() comment: Comment) {
    const { id } = comment;
    return this.postService.getAll({
      where: {
        comments: {
          some: { id }
        },
      },
    }).then(res => res.shift());
  }
}