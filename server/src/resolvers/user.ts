import { Resolver, Query, Arg, Mutation, InputType, Field, ObjectType, Ctx } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entity/User';
import { FieldError } from './FieldError';
import { SchemaContext } from '../types';
import { createAccessToken, createRefreshToken, logout, randomVersion, sendRefreshToken } from '../functions/auth';
import { getConnection, getMongoRepository, ObjectIdColumn } from 'typeorm';
import { verify } from 'jsonwebtoken';

@InputType()
class UserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => String, { nullable: true })
  accessToken?: string;
}

/* ----------------------------------------------------------------------- */
@Resolver()
export class UserResolver {
  // 로그인
  @Mutation(() => UserResponse)
  async login(@Arg('login') { username, password }: UserInput, @Ctx() { res }: SchemaContext): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) return { error: { field: 'login', message: 'Invalid' } };

    const valid = await argon2.verify(user.password, password);
    if (!valid) return { error: { field: 'login', message: 'Invalid' } };

    // refresh token
    sendRefreshToken(res, createRefreshToken(user));

    // access token
    return { accessToken: createAccessToken(user) };
  }

  // 토큰 재발급
  @Mutation(() => UserResponse)
  async refreshToken(@Arg('token') token: string, @Ctx() { res }: SchemaContext): Promise<UserResponse> {
    if (!token) return { error: { field: 'token', message: 'Invalid' } };

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      return { error: { field: 'token', message: 'Invalid' } };
    }

    const user = await User.findOne({ where: { id: ObjectIdColumn(payload!.id) } });
    if (!user) {
      return { error: { field: 'token', message: 'Invalid' } };
    }

    // 버전을 바꾸면 accessToken이 만료된 뒤 refreshToken을 발급받지 못하도록 (버전이 바뀌어도 accessToken 만료 전에는 해당 토큰 사용가능)
    if (user.tokenVersion !== payload.version) {
      return { error: { field: 'token', message: 'Invalid' } };
    }

    // refresh token
    sendRefreshToken(res, createRefreshToken(user));

    // access token
    return { accessToken: createAccessToken(user) };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: SchemaContext): Promise<Boolean> {
    logout(res);
    return true;
  }

  // 회원가입
  @Mutation(() => UserResponse)
  async createUser(@Arg('register') { username, password }: UserInput): Promise<UserResponse> {
    if (username.length < 6) return { error: { field: 'username', message: 'length' } };
    if (password.length < 8) return { error: { field: 'password', message: 'length' } };
    const hashedPassword = await argon2.hash(password);

    try {
      const user = new User();
      user.username = username;
      user.password = hashedPassword;
      user.tokenVersion = randomVersion();

      await User.save(user);
      return { user };
    } catch (err) {
      return { error: { field: 'username', message: 'already exist' } };
    }
  }

  /*
  // 개인페이지라 로그인 외에 필요없음.

  // 회원목록
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  // id로 회원찾기
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null | undefined> {
    if (id.length !== 24) return null;
    const user = await User.findOne({ where: { id: ObjectIdColumn(id) } });

    return user;
  }

  // 회원가입
  @Mutation(() => UserResponse)
  async createUser(@Arg('register') { username, password }: UserInput): Promise<UserResponse> {
    if (username.length < 6) return { error: { field: 'username', message: 'length' } };
    if (password.length < 8) return { error: { field: 'password', message: 'length' } };
    const hashedPassword = await argon2.hash(password);

    try {
      const user = new User();
      user.username = username;
      user.password = hashedPassword;
      user.tokenVersion = randomVersion();

      await User.save(user);
      return { user };
    } catch (err) {
      return { error: { field: 'username', message: 'already exist' } };
    }
  }

  // 토큰버전 바꾸기
  @Mutation(() => Boolean)
  async expireToken(@Arg('id', () => String) id: string) {
    const newVersion = randomVersion();
    let exVersion = newVersion;

    try {
      let cnt = 0;

      // 바꾼 버전이 이전 버전과 같지 않도록
      while (newVersion === exVersion) {
        await getMongoRepository(User)
          .findOneAndUpdate({ id: ObjectIdColumn(id) }, { $set: { tokenVersion: newVersion } })
          .then((res) => {
            if (res.ok !== 1) return false;
            exVersion = res.value.tokenVersion;
          });
        cnt++;
        // 무한루프 방지
        if (cnt > 4) return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  */
}
