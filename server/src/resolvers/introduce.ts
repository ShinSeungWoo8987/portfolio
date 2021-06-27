import { ObjectId } from 'mongodb';
import { Resolver, Query, InputType, Field, Arg, Mutation, ObjectType } from 'type-graphql';
import { Introduce } from '../entity/Introduce';
import { FieldError } from './FieldError';

@InputType()
class IntroduceInput {
  @Field()
  field!: string;
  @Field()
  content!: string;
}

@InputType()
class UpdateIntroduceInput extends IntroduceInput {
  @Field()
  id!: string;
}

@ObjectType()
class IntroduceResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;

  @Field(() => Introduce, { nullable: true })
  introduce?: Introduce;

  @Field(() => [Introduce], { nullable: true })
  introduces?: Introduce[];
}

@Resolver()
export class IntroduceResolver {
  @Query(() => IntroduceResponse)
  async introduce(): Promise<IntroduceResponse> {
    try {
      return { introduces: await Introduce.find() };
    } catch (error) {
      // console.log(error);
      return { error: { field: 'introduce', message: 'cannot read introduce' } };
    }
  }

  @Mutation(() => IntroduceResponse)
  async createIntroduce(@Arg('introduce') { field, content }: IntroduceInput): Promise<IntroduceResponse> {
    try {
      const introduce = new Introduce();
      introduce.field = field;
      introduce.content = content;

      await Introduce.save(introduce);
      return { introduce };
    } catch (err) {
      return { error: { field: 'createIntroduce', message: 'cannot create introduce' } };
    }
  }

  @Mutation(() => IntroduceResponse)
  async updateIntroduce(@Arg('introduce') { id, field, content }: UpdateIntroduceInput): Promise<IntroduceResponse> {
    try {
      const introduce = new Introduce();
      introduce.field = field;
      introduce.content = content;

      await Introduce.update({ id: new ObjectId(id) }, introduce);

      introduce.id = new ObjectId(id);
      return { introduce };
    } catch (err) {
      return { error: { field: 'updateIntroduce', message: 'cannot update introduce' } };
    }
  }
}
