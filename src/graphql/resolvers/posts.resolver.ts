import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { CommentService } from "src/comment.service";
import { PostCategoryService } from "src/post-category.service";
import { PostService } from "src/post.service";
import { UserService } from "src/user.service";
import { Post } from "../models/post.model";
import { BaseResolver } from "./base.resolver";

@Resolver(of => Post)
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
    return this.userService.getAll({
      where: {
        posts: {
          some: { id }
        }
      },
    }).then(res => res.shift());
  }

  @ResolveField()
  async comments(@Parent() post: Post) {
    const { id } = post;
    return this.commentService.getAll({
      where: {
        post: { id },
      },
    })
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
