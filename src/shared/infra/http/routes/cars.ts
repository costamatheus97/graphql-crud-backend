import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableClassController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const createCarController = new CreateCarController();
const listAvailableClassController = new ListAvailableClassController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

router.get("/available", listAvailableClassController.handle);

router.post(
  "/",
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
);

router.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureIsAdmin,
  createCarSpecificationController.handle
);

router.post(
  "/images/:id",
  ensureAuthenticated,
  ensureIsAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export default router;
