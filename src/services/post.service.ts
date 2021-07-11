import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';

import { IPrismaCrud } from './iprisma-crud.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService implements IPrismaCrud<Post> {
  constructor(private readonly prisma: PrismaService) { }

  async upvoteById({ id }: { id: number }) {
    const post = await this.getPost({ id });
    const upvotes = post.upvotes + 1;
    const newData = { ...post, upvotes };

    await this.update({
      where: { id },
      data: newData,
    });

    return newData;
  }

  async getPost(
    PostWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: PostWhereUniqueInput,
    });
  }
  async getOne(
    PostWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: PostWhereUniqueInput,
    });
  }

  async count(params: { where: Prisma.PostWhereInput }) {
    return this.prisma.post.count(params);
  }

  async getEdges(params?: {
    where?: Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByInput
  }) {
    const { where } = params || {}
    const { orderBy } = params || {}

    const firstEdgeParams = {
      where, orderBy
    }

    if (!orderBy) {
      firstEdgeParams.orderBy = { id: 'asc' }
    }

    const lastEdgeParams = {
      where: { ...firstEdgeParams.where },
      orderBy: { ...firstEdgeParams.orderBy }
    };

    for (const [key, val] of Object.entries(lastEdgeParams.orderBy)) {
      lastEdgeParams.orderBy[key] = val === 'asc' ? 'desc' : 'asc';
    }

    return Promise.all([
      this.prisma.post.findFirst(firstEdgeParams),
      this.prisma.post.findFirst(lastEdgeParams),
    ]);
  }

  async getAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.PostWhereUniqueInput;
      where?: Prisma.PostWhereInput;
      orderBy?: Prisma.PostOrderByInput;
    } = {},
  ): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
