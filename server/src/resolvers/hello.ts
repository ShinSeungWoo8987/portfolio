import { ObjectId } from 'mongodb';
import { Resolver, Query, UseMiddleware, MiddlewareFn, Ctx } from 'type-graphql';
import { ObjectIdColumn } from 'typeorm';
import { User } from '../entity/User';
import { hasAuth } from '../functions/auth';
import { SchemaContext } from '../types';

@Resolver()
export class HelloResolver {
  @Query(() => String)
  @UseMiddleware(hasAuth)
  async hello(@Ctx() { req, payload }: SchemaContext) {
    const user = await User.findOne({ where: { id: ObjectIdColumn(payload!.id) } });

    return `hello ${payload!.username} : ${payload!.id}`;
  }
}
