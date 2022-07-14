/* eslint-disable no-underscore-dangle */
import "reflect-metadata";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

let updateBookUseCase: UpdateBookUseCase;

let createBookUseCase: CreateBookUseCase;

let bookRepositoryInMemory: BooksRepositoryInMemory;

describe("Update Book", () => {
  beforeEach(() => {
    bookRepositoryInMemory = new BooksRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(bookRepositoryInMemory);

    updateBookUseCase = new UpdateBookUseCase(bookRepositoryInMemory);
  });

  it("should be able to update a book", async () => {
    const book = await createBookUseCase.execute({
      title: "Harry Potter",
      author: "JK Rowling",
      description: "Fantastic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    await updateBookUseCase.execute(book._id, {
      title: "Harry Potter and the Philosopher's Stone",
    });

    const books = await bookRepositoryInMemory.findAll();

    expect(books[0].title).toBe("Harry Potter and the Philosopher's Stone");
  });
});
