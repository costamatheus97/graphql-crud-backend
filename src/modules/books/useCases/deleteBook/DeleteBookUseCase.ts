import { injectable, inject } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute(id: string): Promise<void> {
    const book = await this.booksRepository.findBookById(id);

    if (!book) {
      throw new AppError("Book not found");
    }

    await this.booksRepository.deleteBookById(id);
  }
}

export { DeleteBookUseCase };
