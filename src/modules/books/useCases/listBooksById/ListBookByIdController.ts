import { container } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { ListBookByIdUseCase } from "./ListBookByIdUseCase";

class ListBookByIdController {
  async handle(id: string): Promise<IHttpResponse<IBook>> {
    const listBookByIdUseCase = container.resolve(ListBookByIdUseCase);

    const book = await listBookByIdUseCase.execute(id);

    return {
      status: 200,
      data: book,
    };
  }
}

const listBookByIdController = new ListBookByIdController();

export { listBookByIdController };
