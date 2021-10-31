import { Router} from "express";

import clientErrorHandler from '../errors/sqliteORM';

import auth from "./auth";
import notes from "./notes";
import user from "./user";


const routes = Router();

routes.use("/auth", auth);
routes.use("/notes", notes);
routes.use("/users", user);

routes.use(clientErrorHandler)

export default routes;
