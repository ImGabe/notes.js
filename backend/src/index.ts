import "reflect-metadata";

import * as cors from "cors"
import * as express from "express";

import { createConnection } from "typeorm";

import routes from "./routes/index";


require('dotenv').config()

createConnection()
  .then(async connection => {

    // create express app
    const app = express();

    app.use(cors({
      origin: ['http://localhost:3000/', 'http://localhost:3000/login', ],
      credentials: true,
    }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    // set routes
    app.use("/", routes)

    // start express server
    app.listen(3030);

  })
  .catch(console.log);
