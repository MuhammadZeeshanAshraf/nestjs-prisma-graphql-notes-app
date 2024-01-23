import { Request as ExpressRequest } from 'express';
import { UserJwtPayload } from './users-login.interface';

export interface ExpressRequestWithUser extends ExpressRequest {
  user: UserJwtPayload & { iat: number; exp: number };
}
