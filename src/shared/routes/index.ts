import { Router } from "express";
import { authRouter } from "modules/auth/routes/AuthRouter";
import { fileRouter } from "modules/file/routes/FileRouter";
import { teacherRouter } from "modules/teacher/routes/TeacherRouter";
import { userRouter } from "modules/user/routes/UserRouter";

const router = Router();

router.get("/", (req, res) => {
  res.send("Server online!");
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/file", fileRouter);
router.use("/teacher", teacherRouter);

export { router };
