import { Router, Request, Response } from "express";
import { QueryFailedError } from "typeorm/error";
import auth from "./auth";
import notes from "./notes";
import user from "./user";

const routes = Router();

function clientErrorHandler(err, req, res, next) {
  // interface ErrExistingField {
  //   error: string,
  //   field: string
  // }
  if (err instanceof QueryFailedError) {
    const [, code, message, dbField] = err.driverError.toString().split(': ')

    if (code === 'SQLITE_CONSTRAINT' && message === 'UNIQUE constraint failed') {
      const field = dbField.split('.').pop()

      res.json({ error: "already-exists", field })
      return
    }

    if (code === 'SQLITE_CONSTRAINT' && message === 'FOREIGN KEY constraint failed') {

      res.json({ error: "asdsads" })
      return
    }
  }

  // FIX THIS BEFORE PRODUCTION
  res.json({ error: err })
}


routes.use("/auth", auth);
routes.use("/notes", notes);
routes.use("/users", user);

routes.use(clientErrorHandler)

export default routes;
