import { ObjectId } from 'mongodb';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Introduce extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id!: ObjectId;

  @Field()
  @Column({ unique: true })
  field!: string;

  @Field()
  @Column()
  content!: string;
}
