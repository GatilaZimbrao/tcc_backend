import { Router } from "express";
import { AuthController } from "../application/controller/AuthController";
import { VerifySession } from "@shared/middlewares/VerifySession";

const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);
authRouter.get("/session", VerifySession, controller.session);

export { authRouter };
