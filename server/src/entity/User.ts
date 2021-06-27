import { ObjectId } from 'mongodb';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, BaseEntity } from 'typeorm';
import { randomVersion } from '../functions/auth';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id!: ObjectId;

  @Field()
  @Column({ unique: true })
  username!: string;

  // @Field() // password를 graphql로 요청할 수 없도록 하기 위함
  @Column()
  password!: string;

  @Column('int', { default: 0 })
  tokenVersion!: number;
}
