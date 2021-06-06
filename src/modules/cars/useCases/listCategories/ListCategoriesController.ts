import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  handle(req: Request, res: Response): Response {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);

    const categories = listCategoryUseCase.execute();

    return res.json(categories);
  }
}
export { ListCategoriesController };
