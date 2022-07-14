import { injectable, inject } from "tsyringe";

import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

@injectable()
class CreateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private readonly booksRepository: IBooksRepository
  ) {}

  async execute({
    title,
    author,
    cover,
    description,
    price,
  }: ICreateBookDTO): Promise<IBook> {
    const book = await this.booksRepository.createBook({
      title,
      author,
      cover,
      description,
      price,
    });

    return book;
  }
}

export { CreateBookUseCase };
