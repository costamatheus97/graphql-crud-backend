import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IUpdateBookDTO } from "@modules/books/dtos/IUpdateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { IBookRepository } from "@modules/books/repositories/IBooksRepository";

import Book from "../models/Book";

class BookRepository implements IBookRepository {
  async deleteBookById(id: string): Promise<void> {
    await Book.deleteOne({ _id: id });
  }

  async findAll(): Promise<IBook[]> {
    const books = await Book.find();

    return books;
  }

  async findBookById(id: string): Promise<IBook> {
    const foundBook = await Book.findById(id);

    return foundBook;
  }

  async createBook({
    title,
    author,
    cover,
    description,
    price,
  }: ICreateBookDTO): Promise<IBook> {
    const book = new Book({ title, author, cover, description, price });

    await book.save();

    return book;
  }

  async updateBook(id: string, data: IUpdateBookDTO): Promise<IBook> {
    const book = await Book.findOneAndUpdate({ _id: id }, data);

    return book;
  }

  async findByTitle(title: string): Promise<IBook> {
    const book = await Book.findOne({ title });

    return book;
  }
}

export { BookRepository };
