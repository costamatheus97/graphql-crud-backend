import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { IUpdateBookDTO } from "../dtos/IUpdateBookDTO";
import { IBook } from "../infra/mongoose/entities/Book";

interface IBooksRepository {
  findAll(): Promise<IBook[]>;
  deleteBookById(id: string): Promise<void>;
  findBookById(id: string): Promise<IBook>;
  createBook(data: ICreateBookDTO): Promise<IBook>;
  updateBook(id: string, data: IUpdateBookDTO): Promise<IBook>;
  findByTitle(title: string): Promise<IBook>;
}

export { IBooksRepository };
