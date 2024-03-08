import { Router } from "express";
import { UserController } from "../application/controller/UserController";

const userRouter = Router();
const controller = new UserController();

// userRouter.delete("/:id", controller.delete);
// userRouter.get("/find/:id", controller.findById);
// userRouter.get("/", controller.list);

export { userRouter };
