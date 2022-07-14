import { container } from "tsyringe";

import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async handle({
    author,
    cover,
    description,
    price,
    title,
  }: ICreateBookDTO): Promise<IHttpResponse<IBook>> {
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
