import { Request, Response, NextFunction } from 'express';
import { promisify } from "util";
import * as redis from "redis";


const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);


export default function authMiddleware(
  request: Request, response: Response, next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {


    // request.userID = id;

    return next()
  } catch {
    return response.sendStatus(401);
  }

}
