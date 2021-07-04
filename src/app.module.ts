import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

import { UsersResolver } from './graphql/resolvers/users.resolver';
import { CommentsResolver } from './graphql/resolvers/comments.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      sortSchema: true,
      autoSchemaFile: true,
    })
  ],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService,
    UserService,
    PostService,
    CommentService,
    CommentsResolver,
    UsersResolver,
  ],
})
export class AppModule { }
