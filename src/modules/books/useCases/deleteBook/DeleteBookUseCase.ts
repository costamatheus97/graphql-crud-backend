import { injectable, inject } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

@injectable()
class DeleteBookUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute(id: string): Promise<void> {
    const book = await this.booksRepository.findBookById(id);

    if (!book) {
      throw new Error("Book not found");
    }

    await this.booksRepository.deleteBookById(id);
  }
}

export { DeleteBookUseCase };
