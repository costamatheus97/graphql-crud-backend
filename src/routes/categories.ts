import { Router, Request, Response } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { imporCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const router = Router();

const upload = multer({
  dest: "./tmp",
});

router.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

router.get("/", (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res);
});

router.post("/import", upload.single("file"), (req, res) => {
  return imporCategoryController.handle(req, res);
});

export default router;
