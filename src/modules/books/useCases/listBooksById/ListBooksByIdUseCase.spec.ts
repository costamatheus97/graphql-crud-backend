import "reflect-metadata";
import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";

import { CreateBookUseCase } from "../createBook/CreateBookUseCase";
import { ListBookByIdUseCase } from "./ListBookByIdUseCase";

let createBookUseCase: CreateBookUseCase;
let listBooksByIdUseCase: ListBookByIdUseCase;

let bookRepositoryInMemory: BooksRepositoryInMemory;

describe("List Books", () => {
  beforeEach(() => {
    bookRepositoryInMemory = new BooksRepositoryInMemory();

    createBookUseCase = new CreateBookUseCase(bookRepositoryInMemory);
    listBooksByIdUseCase = new ListBookByIdUseCase(bookRepositoryInMemory);
  });

  it("should be able to list books by id", async () => {
    const { _id } = await createBookUseCase.execute({
      title: "Harry Potter",
      author: "JK Rowling",
      description: "Fantastic book",
      price: 100,
      cover: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    });

    const book = await listBooksByIdUseCase.execute(_id);

    expect(book).toHaveProperty("title");
  });
});
