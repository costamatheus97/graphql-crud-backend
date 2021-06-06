import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const router = Router();

const createSpecificationController = new CreateSpecificationController();

router.post("/", createSpecificationController.handle);

export default router;
