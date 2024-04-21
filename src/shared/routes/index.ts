import { parseTokens } from "@shared/middlewares/ParseTokens";
import { Router } from "express";
import { authRouter } from "modules/auth/routes/AuthRouter";
import { contactRouter } from "modules/contact/routes/ContactRouter";
import { extensionRouter } from "modules/extension/routes/ExtensionRouter";
import { fileRouter } from "modules/file/routes/FileRouter";
import { teacherRouter } from "modules/teacher/routes/TeacherRouter";

const router = Router();

router.get("/", (req, res) => {
  res.send("Server online!");
});

router.use(parseTokens);
router.use("/auth", authRouter);
router.use("/file", fileRouter);
router.use("/teacher", teacherRouter);
router.use("/contact", contactRouter);
router.use("/extension", extensionRouter);

export { router };
