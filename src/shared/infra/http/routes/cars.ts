import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableClassController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const createCarController = new CreateCarController();
const listAvailableClassController = new ListAvailableClassController();

router.get("/available", listAvailableClassController.handle);

router.post(
  "/",
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
);

export default router;
