import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { UserService } from './user.service';
import { CommentService } from './comment.service';

@Module({
  imports: [],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService,
    UserService,
    PostService,
    CommentService,
  ],
})
export class AppModule { }
