import { Router } from "express";

import authenticate from "./authenticate";
import cars from "./cars";
import categories from "./categories";
import rentals from "./rentals";
import specifications from "./specifications";
import users from "./users";

const router = Router();

router.use("/cars", cars);
router.use("/categories", categories);
router.use("/rentals", rentals);
router.use("/specifications", specifications);
router.use("/users", users);
router.use(authenticate);

export default router;
