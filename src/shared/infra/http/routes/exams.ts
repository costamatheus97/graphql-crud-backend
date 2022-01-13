import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateExamController } from "@modules/exam/useCases/createExam/CreateExamController";
import { ListExamController } from "@modules/exam/useCases/ListExamsByClinic/ListExamByClinicController";
import { UpdateExamController } from "@modules/exam/useCases/updateExam/UpdateExamController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const createExamController = new CreateExamController();
const updateExamController = new UpdateExamController();
const listExamController = new ListExamController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/xray"));

router.get("/", listExamController.handle);

router.post(
  "/",
  ensureAuthenticated,
  uploadAvatar.array("xray"),
  createExamController.handle
);

router.put(
  "/admin/:id",
  ensureAuthenticated,
  ensureIsAdmin,
  updateExamController.handle
);

export default router;
