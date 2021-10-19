import { getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Note } from "../entity/Note";
import { User } from "../entity/User";

export class NoteController {

  async all(request: Request, response: Response, next: NextFunction) {
    const noteRepository = getConnection().getRepository(Note);

    noteRepository
      .find({ relations: ["user"]})
      .then((note) => response.json(note))
      .catch((err) => response.json(err));
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const noteRepository = getConnection().getRepository(Note);
    const { uuid } = request.params;

    noteRepository
      .findOneOrFail({ uuid })
      .then((note) => response.json(note))
      .catch((err) => response.json(err));
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const noteRepository = getConnection().getRepository(Note);
    const userRepository = getConnection().getRepository(User);

    const { title, content } = request.body;
    const { userID: id } = request;

    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    const note = noteRepository.create({ title, content, user });

    noteRepository
      .save(note)
      .then((note) => response.json(note))
      .catch((err) => response.json(err));
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const noteRepository = getConnection().getRepository(Note);
    const { uuid } = request.params;

    const noteToRemove = await noteRepository
      .createQueryBuilder("note")
      .where("note.uuid = :uuid", { uuid })
      .getOneOrFail();

    noteRepository
      .remove(noteToRemove)
      .then((note) => response.json(note))
      .catch((err) => response.json(err));
  }

}
