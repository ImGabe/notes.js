import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import routes from "./routes/index";

import * as express from "express";

require('dotenv').config()

createConnection()
  .then(async connection => {

    // create express app
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    // set routes
    app.use("/", routes)

    // start express server
    app.listen(3000);

  })
  .catch(console.log);
