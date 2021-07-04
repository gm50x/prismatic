import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { UserService } from './user.service';

import {
  User as UserModel,
  Post as PostModel
} from '@prisma/client';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService
  ) { }

  @Post('users')
  async signupUser(
    @Body() userData: { name?: string, email: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.Posts({
      where: { published: true },
    });
  }

  @Get('unpublished/:authorEmail')
  async getUnpublishedPosts(
    @Param('authorEmail') authorEmail: string
  ): Promise<PostModel[]> {
    return this.postService.Posts({
      where: {
        published: false,
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
    return this.postService.Posts({
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
    @Body() postData: { title: string, content?: string, authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: {
          email: authorEmail
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
}
