import { injectable, inject } from "tsyringe";

import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

@injectable()
class ListBooksUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute(): Promise<IBook[]> {
    const books = await this.booksRepository.findAll();

    return books;
  }
}

export { ListBooksUseCase };
