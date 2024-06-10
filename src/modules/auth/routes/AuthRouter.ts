import { Router } from "express";
import { AuthController } from "../application/controller/AuthController";

const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);
authRouter.get("/session", controller.session);

export { authRouter };
