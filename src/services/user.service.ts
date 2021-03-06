import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { IPrismaCrud } from './iprisma-crud.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService implements IPrismaCrud<User> {
  constructor(private readonly prisma: PrismaService) { }

  async count(params?: { where: Prisma.UserWhereInput }) {
    return this.prisma.user.count(params)
  }

  async getEdges(params?: {
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByInput
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
      this.prisma.user.findFirst(firstEdgeParams),
      this.prisma.user.findFirst(lastEdgeParams),
    ]);
  }

  async getAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByInput;
    } = {},
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params || {};
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
