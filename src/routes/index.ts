import { Router } from "express";

import categories from "./categories";
import specifications from "./specifications";

const router = Router();

router.use("/categories", categories);
router.use("/specifications", specifications);

export default router;
