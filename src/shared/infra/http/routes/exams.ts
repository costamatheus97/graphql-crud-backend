import { Router } from "express";
import multer from "multer";

import { CreateExamController } from "@modules/exam/useCases/createExam/CreateExamController";
import { UpdateExamController } from "@modules/exam/useCases/updateExam/UpdateExamController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const createExamController = new CreateExamController();
const updateExamController = new UpdateExamController();

router.get("/", listAvailableClassController.handle);

router.post("/", ensureAuthenticated, createExamController.handle);

router.put(
  "/admin/:id",
  ensureAuthenticated,
  ensureIsAdmin,
  updateExamController.handle
);

export default router;
