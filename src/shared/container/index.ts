import { container } from "tsyringe";

import { BookRepository } from "@modules/books/infra/mongoose/repositories/BooksRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BookRepository
);
