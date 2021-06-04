import { Router, Request, Response } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res);
});

export default router;
