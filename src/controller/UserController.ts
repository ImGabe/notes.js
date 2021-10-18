import { getConnection, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { User } from "../entity/User";

// interface ResponseInternalError {
//   details: string,
//   code: number,
//   type: string
// }

export class UserController {

  async all(_request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);

    userRepository
      .find({ relations: ["notes"] })
      .then((note) => response.json(note))
      .catch((err) => next(err));
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);
    const { uuid } = request.params;

    userRepository
      .findOneOrFail({ uuid })
      .then((note) => response.json(note))
      .catch((err) => next(err));
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);
    const { username, email, password } = request.body;

    const user = userRepository.create({ username, email, password });
    const validations = await validate(user)

    // FIXME
    if (Array.isArray(validations) && validations.length) {
      const errors = validations.flatMap(({ constraints }) => Object.values(constraints))

      response.status(400)
      response.json({ "error": errors })
    }

    userRepository
      .save(user)
      .then((user) => response.json(user))
      .catch((err) => next(err));

  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userRepository = getConnection().getRepository(User);
    const { uuid } = request.params;

    const userToRemove = await userRepository.findOne({ where: { uuid } });

    userRepository
      .remove(userToRemove)
      .then((user) => response.json(user))
      .catch((err) => next(err));
  }

}
