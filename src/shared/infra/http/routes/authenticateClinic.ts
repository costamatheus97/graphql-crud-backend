import { Router } from "express";

import { AuthenticateRadiologistController } from "@modules/accounts/useCases/authenticateRadiologist/AuthenticateRadiologistController";

const router = Router();

const authenticateUserController = new AuthenticateRadiologistController();

router.post("/clinic/sessions", authenticateUserController.handle);

export default router;
