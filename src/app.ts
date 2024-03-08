import "reflect-metadata";
import "express-async-errors";
import "shared/container";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
// import pino from "express-pino-logger";
import helmet from "helmet";
import { router } from "shared/routes";
import { handleError } from "@shared/middlewares/HandleError";

dotenv.config();

export function createApp(): Express {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  app.use(helmet());
  // app.use(pino());

  app.use("/api/v1", router);

  app.get("/", (req, res) => {
    res.send("Server online!");
  });

  app.get("*", function (_, res) {
    res.status(404).send("Not found");
  });

  app.use(handleError);

  return app;
}
