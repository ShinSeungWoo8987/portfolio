import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';

@ObjectType()
export class ProjectImg {
  @Field(() => Int)
  @Column()
  order!: number;

  @Field()
  @Column()
  url!: string;

  constructor(order: number, url: string) {
    this.order = order;
    this.url = url;
  }
}
