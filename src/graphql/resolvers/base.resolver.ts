import { Type } from '@nestjs/common';
import { Resolver, Query, Int, Args, ObjectType } from '@nestjs/graphql';

import { IPrismaCrud } from '@prismatic/services';
import { Paginated } from '@prismatic/graphql/models';

export function BaseResolver<T extends Type<unknown>>(
  classRef: T,
  classIdType = Int,
): any {

  function getCursor(id: any): string {
    return Buffer.from(
      JSON.stringify({ id })
    ).toString('base64')
  }

  function getEdges(data: T[]): { cursor: string, node: T }[] {
    const edges = [data[0], data[data.length - 1]]
    return edges.map((entry: any) => ({
      cursor: getCursor(entry.id),
      node: entry
    }))
  }

  function getPagination(first: number, after: string, offset: number = 0) {
    const pagination: any = {
      skip: offset,
      take: first
    };

    if (after) {
      try {
        const cursor = JSON.parse(Buffer.from(after, 'base64').toString('utf8'));
        pagination.skip = offset !== 0 ? offset : 1;
        pagination.cursor = cursor
      } catch { }
    }

    return pagination;
  }

  @ObjectType(`Paginated${classRef.name}`)
  class PaginatedType extends Paginated(classRef) { }
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private readonly service: IPrismaCrud<T>) { }
    @Query((returns) => [classRef], {
      name: `getAll${classRef.name}`,
      description: `Get a list of ${classRef.name}`,
    })
    async getAll(): Promise<T[]> {
      return this.service.getAll();
    }

    @Query((returns) => PaginatedType, {
      name: `getSome${classRef.name}`,
      description: `Get a paginated list of ${classRef.name}`,
    })
    async getSome(
      @Args('first', {
        type: () => Int,
        defaultValue: 5,
        nullable: true
      }) first: number,
      @Args('after', { type: () => String, nullable: true })
      after: any
    ): Promise<PaginatedType> {
      const pagination = getPagination(first, after)

      const [edges, data, count] = await Promise.all([
        this.service.getEdges(),
        this.service.getAll({ ...pagination }),
        this.service.count(),
      ]);

      const hasNextPage = !data.some((entry: any) => {
        const finalNode = edges[1] as any;
        return entry.id === finalNode.id
      });

      return {
        edges: getEdges(data),
        totalCount: count,
        hasNextPage,
        nodes: data
      }
    }

    @Query((returns) => classRef, {
      name: `getOne${classRef.name}`,
      description: `Get one ${classRef.name}`,
    })
    async getOne(
      @Args('id', { type: () => classIdType }) id: number,
    ): Promise<T | null> {
      return this.service.getOne({ id });
    }
  }

  return BaseResolverHost;
}
