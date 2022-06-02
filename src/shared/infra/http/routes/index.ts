import { Router } from "express";

import questionnaires from "./questionnaires";

const router = Router();

router.use("/questionnaires", questionnaires);

export default router;
