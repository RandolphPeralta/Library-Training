import { IBookUseCase } from "../../domain/interfaces/IUsescases";
import { IAddidionalaction } from "../../domain/interfaces/IAction";
import { Book } from "../../domain/types/Book";

export class BookUseCase implements IBookUseCase {
    constructor(
        private bookrepository: IAddidionalaction<Book>,
    ) { }

    register(book: Book): boolean {
        if (!book.id || !book.title || !book.author) 
            { return false; }
        book.available = true;
        return this.bookrepository.create(book);
    }

    erase(id: string) {
        const book = this.bookrepository.findbyid(id)[0];
        if (!book) { return false; }

        if (!book.available) {
            return false;
        }

        return this.bookrepository.delete(id);
    }

    actualize(book: Book): boolean {
        const newbook = this.bookrepository.findbyid(book.id)[0];
        if (!newbook.available) {
            return false;
        }
        return this.bookrepository.update(book);
    }

    show(): Book[] {
        return this.bookrepository.read();
    }
}