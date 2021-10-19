import { getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { User } from "../entity/User";
export class AuthController {
  async authenticate(request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);
    const { email, password } = request.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.sendStatus(401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    response.json({
      user,
      token
    })

  }
}
