import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secret');
    const { id } = data as TokenPayload;

    request.userID = id;

    return next()
  } catch {
    return response.sendStatus(401);
  }

}
