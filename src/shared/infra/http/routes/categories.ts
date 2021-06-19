import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const router = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

router.post(
  "/",
  ensureAuthenticated,
  ensureIsAdmin,
  createCategoryController.handle
);

router.get("/", listCategoriesController.handle);

router.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureIsAdmin,
  importCategoryController.handle
);

export default router;
