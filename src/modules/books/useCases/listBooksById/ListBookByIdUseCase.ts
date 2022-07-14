import { injectable, inject } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

@injectable()
class ListBookByIdUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute(id: string): Promise<IBook> {
    const book = await this.booksRepository.findBookById(id);

    return book;
  }
}

export { ListBookByIdUseCase };
