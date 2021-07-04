import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';

import {
  User as UserModel,
  Post as PostModel,
  Comment as CommentModel,
} from '@prisma/client';

import { PostService } from './post.service';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) { }

  @Post('users')
  async signupUser(
    @Body() userData: { name?: string, email: string }
  ): Promise<UserModel> {
    return this.userService.createUser({
      ...userData,
      password: 'Password@123'
    });
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.getPost({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: { published: true },
    });
  }

  @Get('unpublished/:authorEmail')
  async getUnpublishedPosts(
    @Param('authorEmail') authorEmail: string
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        published: false,
        author: {
          email: authorEmail,
        }
      },
    });
  }

  @Get('posts/:authorEmail')
  async getAuthorsPosts(
    @Param('authorEmail') authorEmail: string
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        author: {
          email: authorEmail,
        }
      },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString,
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
              mode: 'insensitive'
            },
            published: true
          },
          {
            content: {
              contains: searchString,
              mode: 'insensitive'
            },
            published: true
          },
        ]
      }
    });
  }

  @Post('posts')
  async createDraft(
    @Body() postData: {
      title: string,
      content?: string,
      authorEmail: string,
      category: number
    },
  ): Promise<PostModel> {
    const { title, content, authorEmail, category } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: {
          email: authorEmail
        }
      },
      category: {
        connect: {
          id: category
        }
      }
    });
  }

  @Post('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true }
    });
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  @Post('comments')
  async addPostComment(
    @Body() commentData: {
      title: string,
      content?: string,
      authorEmail: string,
      postId: number
    }
  ): Promise<CommentModel> {
    const { title, content, authorEmail, postId } = commentData;
    return this.commentService.createComment({
      title,
      content,
      post: {
        connect: {
          id: postId,
        }
      },
      author: {
        connect: {
          email: authorEmail,
        }
      }
    });
  }

  @Get('posts/:id/comments')
  async getPostsComments(
    @Param('id') id: number,
  ) {
    return this.commentService.getComments({
      where: {
        post: {
          id: Number(id),
          author: {
            email: 'getuliomagela@outlook.com'
          }
        },
      },
    });
  }
}
