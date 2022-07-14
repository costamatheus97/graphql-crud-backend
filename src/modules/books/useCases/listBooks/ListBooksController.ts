import { container } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { ListBooksUseCase } from "./ListBooksUseCase";

class ListBooksController {
  async handle(): Promise<IHttpResponse<IBook[]>> {
    const listBooksUseCase = container.resolve(ListBooksUseCase);

    const books = await listBooksUseCase.execute();

    return {
      status: 200,
      data: books,
    };
  }
}

const listBooksController = new ListBooksController();

export { listBooksController };
