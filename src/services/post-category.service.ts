import { Injectable } from '@nestjs/common';
import { Prisma, PostCategory } from '@prisma/client';

import { IPrismaCrud } from './iprisma-crud.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostCategoryService implements IPrismaCrud<PostCategory> {
  constructor(private readonly prisma: PrismaService) { }

  async count(params?: { where: Prisma.PostCategoryWhereInput }) {
    return this.prisma.postCategory.count(params);
  }

  async getEdges(params?: {
    where?: Prisma.PostCategoryWhereInput,
    orderBy?: Prisma.PostCategoryOrderByInput
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
      this.prisma.postCategory.findFirst(firstEdgeParams),
      this.prisma.postCategory.findFirst(lastEdgeParams),
    ]);
  }

  async getOne(
    postCategoryWhereUniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<PostCategory | null> {
    return this.prisma.postCategory.findUnique({
      where: postCategoryWhereUniqueInput,
    });
  }

  async getAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PostCategoryWhereUniqueInput;
      where?: Prisma.PostCategoryWhereInput;
      orderBy?: Prisma.PostCategoryOrderByInput;
    } = {},
  ): Promise<PostCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.postCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.PostCategoryCreateInput): Promise<PostCategory> {
    return this.prisma.postCategory.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PostCategoryWhereUniqueInput;
    data: Prisma.PostCategoryUpdateInput;
  }): Promise<PostCategory> {
    const { where, data } = params;
    return this.prisma.postCategory.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.PostCategoryWhereUniqueInput,
  ): Promise<PostCategory> {
    return this.prisma.postCategory.delete({
      where,
    });
  }
}
