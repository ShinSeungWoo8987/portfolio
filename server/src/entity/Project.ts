import { ObjectId } from 'mongodb';
import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';
import { ProjectImg } from './ProjectImg';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id!: ObjectId;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  subtitle!: string;

  @Field()
  @Column()
  background_up_color!: string;

  @Field()
  @Column()
  background_down_color!: string;

  @Field()
  @Column()
  line_color!: string;

  @Field()
  @Column()
  font_color!: string;

  @Field()
  @Column()
  platform!: string;

  @Field()
  @Column()
  domain?: string;

  @Field()
  @Column()
  func!: string;

  @Field()
  @Column()
  github?: string;

  @Field(() => [String])
  @Column()
  front_end!: string[];

  @Field(() => [String])
  @Column()
  back_end!: string[];

  @Field(() => [String])
  @Column()
  database!: string[];

  @Field(() => [String])
  @Column()
  cloud!: string[];

  @Field(() => [ProjectImg])
  @Column((type) => ProjectImg)
  project_img!: ProjectImg[];
}
