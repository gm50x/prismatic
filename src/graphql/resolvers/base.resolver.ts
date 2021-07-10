import { Type } from '@nestjs/common';
import { Resolver, Query, Int, Args } from '@nestjs/graphql';

import { IPrismaCrud } from '@prismatic/services';

export function BaseResolver<T extends Type<unknown>>(
  classRef: T,
  classIdType = Int,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private readonly service: IPrismaCrud<T>) {}
    @Query((returns) => [classRef], {
      name: `getAll${classRef.name}`,
      description: `Get a list of ${classRef.name}`,
    })
    async getAll(): Promise<T[]> {
      return this.service.getAll();
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
