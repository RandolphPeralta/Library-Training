import { IBookUseCase } from "../domain/interfaces/IUsescases";
import { IRepository } from "../domain/interfaces/IRepository";
import { Book } from "../domain/types/Book";

export class BookUseCase implements IBookUseCase {
    constructor(
        private bookRepository: IRepository<Book>,
    ) { }

    register(book: Book): boolean {
        if (!book.id || !book.title || !book.author) 
            { return false; }
        book.available = true;
        return this.bookRepository.create(book);
    }

    erase(id: string) {
        const book = this.getById(id);
        if (!book) { return false; }

        if (!book.available) {
            return false;
        }

        return this.bookRepository.delete(id);
    }

    actualize(book: Book): boolean {
        const newbook = this.getById(book.id);
        if (!newbook.available) {
            return false;
        }
        return this.bookRepository.update(book);
    }

    show(): Book[] {
        return this.bookRepository.read();
    }

    getById(id: string) {
        return this.bookRepository.findbyid(id)[0];
    }
}