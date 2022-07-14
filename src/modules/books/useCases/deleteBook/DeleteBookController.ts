import { container } from "tsyringe";

import { IHttpResponse } from "@modules/books/interfaces/HttpResponse";

import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async handle(id: string): Promise<IHttpResponse> {
    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute(id);

    return {
      status: 200,
    };
  }
}

const deleteBookController = new DeleteBookController();

export { deleteBookController };
