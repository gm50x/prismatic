import { Injectable } from "@nestjs/common";
import { Prisma, Comment } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async getComment(commentWhereUniqueInput: Prisma.CommentWhereUniqueInput): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput
    })
  }

  async getComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip, take, cursor, where, orderBy
    })
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data
    })
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput,
    data: Prisma.CommentUpdateInput
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({
      data, where
    })
  }

  async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where
    })
  }
}
