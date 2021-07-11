import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';

import { IPrismaCrud } from './iprisma-crud.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class CommentService implements IPrismaCrud<Comment> {
  constructor(private readonly prisma: PrismaService) { }

  async count(params?: { where: Prisma.CommentWhereInput }) {
    return this.prisma.comment.count(params)
  }

  async getEdges(params?: {
    where?: Prisma.CommentWhereInput,
    orderBy?: Prisma.CommentOrderByInput
  }) {
    const { where } = params || {}
    const { orderBy } = params || {}

    const firstEdgeParams = {
      where, orderBy
    }

    if (!orderBy) {
      firstEdgeParams.orderBy = { id: 'asc' }
    }

    const lastEdgeParams = { ...firstEdgeParams };

    for (const [key, val] of Object.entries(lastEdgeParams.orderBy)) {
      lastEdgeParams.orderBy[key] = val === 'asc' ? 'desc' : 'asc';
    }

    return Promise.all([
      this.prisma.comment.findFirst(firstEdgeParams),
      this.prisma.comment.findFirst(lastEdgeParams),
    ]);
  }

  async getComment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }

  async getOne(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
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
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async getAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CommentWhereUniqueInput;
      where?: Prisma.CommentWhereInput;
      orderBy?: Prisma.CommentOrderByInput;
    } = {},
  ): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createComment(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }
  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    return this.prisma.comment.create({
      data,
    });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

  async update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }

  async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.delete({
      where,
    });
  }
}
