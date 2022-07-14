import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IBook } from "@modules/books/infra/mongoose/entities/Book";
import { createBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { deleteBookController } from "@modules/books/useCases/deleteBook/DeleteBookController";
import { listBooksController } from "@modules/books/useCases/listBooks/ListBooksController";
import { listBookByIdController } from "@modules/books/useCases/listBooksById/ListBookByIdController";
import { updateBookController } from "@modules/books/useCases/updateBooks/UpdateBookController";

export default {
  Query: {
    async listBooks(): Promise<IBook[]> {
      const { data } = await listBooksController.handle();

      return data;
    },
    async listBookById({ id }): Promise<IBook> {
      const { data } = await listBookByIdController.handle(id);

      return data;
    },
    async createBook(
      _,
      { author, cover, description, price, title }: ICreateBookDTO
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
    async updateBook({
      author,
      cover,
      description,
      price,
      title,
    }: ICreateBookDTO): Promise<IBook> {
      const { data } = await createBookController.handle({
        author,
        cover,
        description,
        price,
        title,
      });

      return data;
    },
  },
};
