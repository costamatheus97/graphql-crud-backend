import { injectable, inject } from "tsyringe";

import { IUpdateBookDTO } from "@modules/books/dtos/IUpdateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

@injectable()
class UpdateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute(id: string, data: IUpdateBookDTO): Promise<IBook> {
    const book = await this.booksRepository.findBookById(id);

    if (!book) {
      throw new Error("Book not found");
    }

    const updatedBook = await this.booksRepository.updateBook(id, data);

    return updatedBook;
  }
}

export { UpdateBookUseCase };
