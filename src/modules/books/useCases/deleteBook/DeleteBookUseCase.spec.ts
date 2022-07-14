/* eslint-disable no-underscore-dangle */
import "reflect-metadata";

import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

let deleteBookUseCase: DeleteBookUseCase;
let createBookUseCase: CreateBookUseCase;
let bookRepositoryInMemory: BooksRepositoryInMemory;

describe("Delete Book", () => {
  beforeEach(() => {
    bookRepositoryInMemory = new BooksRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(bookRepositoryInMemory);
    deleteBookUseCase = new DeleteBookUseCase(bookRepositoryInMemory);
  });

  it("should be able to delete a book", async () => {
    const book = await createBookUseCase.execute({
      title: "Harry Potter",
      author: "JK Rowling",
      description: "Fantastic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    await deleteBookUseCase.execute(book._id);

    const books = await bookRepositoryInMemory.findAll();

    expect(books.length).toBe(0);
  });
});
