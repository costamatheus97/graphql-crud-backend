/* eslint-disable no-underscore-dangle */
import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IUpdateBookDTO } from "@modules/books/dtos/IUpdateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import Book from "@modules/books/infra/mongoose/models/Book";

import { IBooksRepository } from "../IBooksRepository";

class BooksRepositoryInMemory implements IBooksRepository {
  books: IBook[] = [];

  async deleteBookById(id: string): Promise<void> {
    const updatedBooks = this.books.filter((book) => book._id !== id);

    this.books = updatedBooks;
  }

  async findAll(): Promise<IBook[]> {
    return this.books;
  }

  async findBookById(id: string): Promise<IBook> {
    return this.books.find((book) => book._id === id);
  }

  async createBook({
    title,
    author,
    cover,
    description,
    price,
  }: ICreateBookDTO): Promise<IBook> {
    const book = new Book({
      title,
      author,
      cover,
      description,
      price,
    });

    this.books.push(book);

    return book;
  }

  async updateBook(id: string, data: IUpdateBookDTO): Promise<IBook> {
    const bookIndex = this.books.findIndex((book) => book._id === id);
    const book = this.books[bookIndex];

    Object.assign(book, data);

    this.books[bookIndex] = book;

    return book;
  }

  async findByTitle(title: string): Promise<IBook> {
    return this.books.find((book) => book.title === title);
  }
}

export { BooksRepositoryInMemory };
