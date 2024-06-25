import "reflect-metadata";
import "express-async-errors";
import "shared/container";

import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { router } from "shared/routes";
import { handleError } from "@shared/middlewares/HandleError";
import path from "path";

dotenv.config();

export function createApp(): Express {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  const allowedOrigins: string[] = [
    "http://localhost:5173",
    "http://192.168.1.79:5173",
    "http://192.168.67.135:5173",
    "http://bsi.cefet-rj.br:5173",
  ];

  const corsOptions: CorsOptions = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (allowedOrigins.includes(origin as string) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(helmet());

  app.use("/api/v1", router);

  app.get("/", (req, res) => {
    res.send("Server online! :D");
  });

  app.use("/images", express.static(path.join(__dirname, "./images")));

  app.get("*", function (_, res) {
    res.status(404).send("Not found");
  });

  app.use(handleError);

  return app;
}
