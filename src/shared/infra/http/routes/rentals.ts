import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { FinishRentalController } from "@modules/rentals/useCases/finishRental/FinishRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();
const finishRentalController = new FinishRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const router = Router();

router.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

router.post("/", ensureAuthenticated, createRentalController.handle);

router.post(
  "/devolution/:id",
  ensureAuthenticated,
  finishRentalController.handle
);

export default router;
