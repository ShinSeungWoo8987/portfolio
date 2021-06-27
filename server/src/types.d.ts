import { Request, Response } from 'express';
import { type } from 'os';
import { Field, ObjectType } from 'type-graphql';
import { Session, SessionData } from 'express-session';

type SchemaContext = {
  req: Request & { session: Session & Partial<SessionData> & { userId?: string; version: number } };
  res: Response;
  payload?: { id: string; username: string; version: number };
};
