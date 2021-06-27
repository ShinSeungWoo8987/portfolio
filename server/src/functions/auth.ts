import { NextFunction, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { User } from '../entity/User';
import { SchemaContext } from '../types';

// 미들웨어로 쓰일 function
export const hasAuth: MiddlewareFn<SchemaContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) throw new Error('Invalid');

  try {
    const token = authorization?.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    // 토큰 정보를 담아서 전달
    context.payload = payload as any;
  } catch (error) {
    throw new Error('Expired');
  }
  return next();
};

export const createAccessToken = (user: User) =>
  sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1h',
  });

export const createRefreshToken = (user: User) =>
  sign({ id: user.id, username: user.username, version: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
  });
};

export const logout = (res: Response) => {
  res.cookie('jid', '', {
    httpOnly: true,
    expires: new Date('1970.01.01'),
  });
};

export const randomVersion = () => Math.floor(Math.random() * 1000);
