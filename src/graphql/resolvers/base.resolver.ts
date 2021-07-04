import { Type } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private readonly service: any) { }
    @Query(returns => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return this.service.getAll()
      return []
    }
  }

  return BaseResolverHost
}