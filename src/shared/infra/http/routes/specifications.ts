import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";

const router = Router();

const createSpecificationController = new CreateSpecificationController();

router.post(
  "/",
  ensureAuthenticated,
  ensureIsAdmin,
  createSpecificationController.handle
);

export default router;
