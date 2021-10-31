import { getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import * as bcrypt from "bcryptjs";
import * as redis from "redis";

import { User } from "../entity/User";


interface SessionUser {
  id: string,
  username: String
}

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const expireAsync = promisify(client.expire).bind(client);

client.on("error", function (error) {
  console.error(error);
});

export class AuthController {
  async authenticate(request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);
    const { email, password, stayLogged } = request.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const sessionToken = Math.random().toString(36).substr(2);
    const sessionUser: SessionUser = {
      id: user.id,
      username: user.username
    }

    setAsync(sessionToken, JSON.stringify(sessionUser))
      .catch(console.error);

    if (!stayLogged) {
      const ONE_HOUR = 3600
      expireAsync(sessionToken, ONE_HOUR).catch(console.error);
    }

    response
      .status(200)
      .json({ sessionToken });
  }

  async check(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    getAsync(token)
      .then(JSON.parse)
      .then((user: SessionUser) => response
        .status(200)
        .json({ username: user.username }))
      .catch(_ => response.sendStatus(401));
  }

  async disauthentication(request: Request, response: Response, next: NextFunction) {
    // TODO
  }
}
