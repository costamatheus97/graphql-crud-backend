import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IUpdateBookDTO } from "@modules/books/dtos/IUpdateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { createBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { deleteBookController } from "@modules/books/useCases/deleteBook/DeleteBookController";
import { listBooksController } from "@modules/books/useCases/listBooks/ListBooksController";
import { listBookByIdController } from "@modules/books/useCases/listBooksById/ListBookByIdController";
import { updateBookController } from "@modules/books/useCases/updateBooks/UpdateBookController";

export default {
  Query: {
    async getBooks(): Promise<IBook[]> {
      const { data } = await listBooksController.handle();

      return data;
    },
    async getBookById(_, { id }: { id: string }): Promise<IBook> {
      const { data } = await listBookByIdController.handle(id);

      return data;
    },
  },
  Mutation: {
    async createBook(
      _,
      {
        payload: { author, cover, description, price, title },
      }: { payload: ICreateBookDTO }
    ): Promise<IBook> {
      const { data } = await createBookController.handle({
        author,
        cover,
        description,
        price,
        title,
      });

      return data;
    },
    async updateBook(
      _,
      {
        payload: { id, author, cover, description, price, title },
      }: { payload: IUpdateBookDTO }
    ): Promise<IBook> {
      const { data } = await updateBookController.handle({
        id,
        author,
        cover,
        description,
        price,
        title,
      });

      return data;
    },
    async deleteBook(_, { id }: { id: string }): Promise<string> {
      await deleteBookController.handle(id);

      return id;
    },
  },
};
