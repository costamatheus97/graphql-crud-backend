import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();

router.post("/sessions", authenticateUserController.handle);

export default router;
