import { Router, Request, Response } from "express";
import { QueryFailedError } from "typeorm/error";
import auth from "./auth";
import notes from "./notes";
import user from "./user";

const routes = Router();

function clientErrorHandler(err, req, res, next) {

  if (err instanceof QueryFailedError) {
    const [, code, message, dbField] = err.driverError.toString().split(': ')

    // interface ErrExistingField {
    //   error: string,
    //   field: string
    // }
    if (code === 'SQLITE_CONSTRAINT' && message === 'UNIQUE constraint failed') {
      const field = dbField.split('.').pop()

      res.json({ error: "already-exists", field })
      return
    }

    // Probably is not necessary more...
    //
    // // interface ErrForeingKey {
    // //   error: string
    // // }
    // if (code === 'SQLITE_CONSTRAINT' && message === 'FOREIGN KEY constraint failed') {
    //   res.json({ error: "delete your notes before delete your account" })
    //   return
    // }
  }

  // FIX THIS BEFORE PRODUCTION
  res.json({ error: err })
}


routes.use("/auth", auth);
routes.use("/notes", notes);
routes.use("/users", user);

routes.use(clientErrorHandler)

export default routes;
