import { container } from "tsyringe";

import { IUpdateBookDTO } from "@modules/books/dtos/IUpdateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async handle({
    id,
    ...payload
  }: IUpdateBookDTO): Promise<IHttpResponse<IBook>> {
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
