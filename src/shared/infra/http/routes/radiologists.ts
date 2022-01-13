import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateRadiologistController } from "@modules/accounts/useCases/createRadiologist/CreateRadiologistController";
import { UpdateRadiologistAvatarController } from "@modules/accounts/useCases/updateRadiologistAvatar/UpdateRadiologistAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const router = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createRadiologistController = new CreateRadiologistController();
const updateRadiologistAvatarController =
  new UpdateRadiologistAvatarController();

router.post("/", createRadiologistController.handle);
router.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateRadiologistAvatarController.handle
);

export default router;
