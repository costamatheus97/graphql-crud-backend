import "reflect-metadata";
import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "./CreateBookUseCase";

let createBookUseCase: CreateBookUseCase;

let bookRepositoryInMemory: BooksRepositoryInMemory;

describe("Create Book", () => {
  beforeEach(() => {
    bookRepositoryInMemory = new BooksRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(bookRepositoryInMemory);
  });

  it("should be able to create a new book", async () => {
    const book = await createBookUseCase.execute({
      title: "Harry Potter",
      author: "JK Rowling",
      description: "Fantastic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    expect(book).toHaveProperty("_id");
    expect(book).toHaveProperty("title");
    expect(book).toHaveProperty("author");
    expect(book).toHaveProperty("price");
    expect(book).toHaveProperty("cover");
    expect(book).toHaveProperty("description");
  });
});
