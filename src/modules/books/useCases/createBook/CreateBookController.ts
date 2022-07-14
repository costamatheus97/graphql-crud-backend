import { Request } from "express";
import { container } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async handle(req: Request): Promise<IHttpResponse<IBook>> {
    const { title, author, cover, description, price } = req.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const book = await createBookUseCase.execute({
      title,
      author,
      cover,
      description,
      price,
    });

    return {
      status: 200,
      data: book,
    };
  }
}

const createBookController = new CreateBookController();

export { createBookController };
