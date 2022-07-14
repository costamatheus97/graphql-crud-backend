import "reflect-metadata";
import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { ListBooksUseCase } from "./ListBooksUseCase";

let createBookUseCase: CreateBookUseCase;
let listBooksUseCase: ListBooksUseCase;

let bookRepositoryInMemory: BooksRepositoryInMemory;

describe("List Books", () => {
  beforeEach(() => {
    bookRepositoryInMemory = new BooksRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(bookRepositoryInMemory);
    listBooksUseCase = new ListBooksUseCase(bookRepositoryInMemory);
  });

  it("should be able to list books", async () => {
    await createBookUseCase.execute({
      title: "Harry Potter",
      author: "JK Rowling",
      description: "Fantastic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    await createBookUseCase.execute({
      title: "Game of Thrones",
      author: "George R R Martin",
      description: "Epic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    const books = await listBooksUseCase.execute();

    expect(books.length).toBe(2);
  });
});
