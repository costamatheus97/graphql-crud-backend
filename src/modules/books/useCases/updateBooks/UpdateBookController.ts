import { Request } from "express";
import { container } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async handle(req: Request): Promise<IHttpResponse<IBook>> {
    const payload = req.body;
    const { id } = req.params;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);

    const updatedBook = await updateBookUseCase.execute(id, payload);

    return {
      status: 200,
      data: updatedBook,
    };
  }
}

const updateBookController = new UpdateBookController();

export { updateBookController };
