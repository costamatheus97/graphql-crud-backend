import { Request } from "express";
import { container } from "tsyringe";

import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async handle(req: Request): Promise<IHttpResponse> {
    const { id } = req.params;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute(id);

    return {
      status: 200,
    };
  }
}

const deleteBookController = new DeleteBookController();

export { deleteBookController };
