import { Router } from "express";

import { CreateVeterinarianController } from "@modules/accounts/useCases/createVeterinarian/CreateVeterinarianController";
import { ListVeterinarianController } from "@modules/accounts/useCases/ListVeterinariansByClinic/ListVeterinarianByClinicController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const router = Router();

const createVeterinarianController = new CreateVeterinarianController();
const listVeterinarianController = new ListVeterinarianController();

router.get("/", ensureAuthenticated, listVeterinarianController.handle);
router.post("/", ensureAuthenticated, createVeterinarianController.handle);

export default router;
