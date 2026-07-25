import { IAdditionalAction } from "../entities/interfaces/IAction";
import { Book } from "../entities/types/Book";

export class Bookusecase implements IAdditionalAction<Book> {

    constructor(private bookservice: IAdditionalAction<Book>) { }

    create(book: Book): boolean {

        const existing = this.bookservice.findbyid(book.id);

        if (existing.length > 0) {
            return false;
        }

        return this.bookservice.create(book);
    }

    delete(id: string): boolean {

        return this.bookservice.delete(id);

    }

    update(book: Book): boolean {

        const available = book.available

        if (!available) {
            return false
        }
        const existing = this.bookservice.findbyid(book.id);

        if (existing.length === 0) {
            return false;
        }

        return this.bookservice.update(book);

    }

    read(): Book[] {

        return this.bookservice.read();

    }

    findbyid(id: string): Book[] {

        return this.bookservice.findbyid(id);

    }

}