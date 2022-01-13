import { Router } from "express";

import authenticateClinic from "./authenticateClinic";
import authenticateRadiologist from "./authenticateRadiologist";
import exams from "./exams";
import radiologists from "./radiologists";
import veterinarians from "./veterinarians";

const router = Router();

router.use("/exams", exams);
router.use("/veterinarians", veterinarians);
router.use("/radiologists", radiologists);
router.use(authenticateRadiologist);
router.use(authenticateClinic);

export default router;
