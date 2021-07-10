import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import {
  PostService,
  PrismaService,
  UserService,
  CommentService,
  PostCategoryService,
} from '@prismatic/services';

import {
  UsersResolver,
  CommentsResolver,
  PostsResolver,
} from '@prismatic/graphql';

import { AppController } from '@prismatic/routers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      sortSchema: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    UserService,
    PostService,
    PostCategoryService,
    CommentService,
    UsersResolver,
    PostsResolver,
    CommentsResolver,
  ],
})
export class AppModule { }
