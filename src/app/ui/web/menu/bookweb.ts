import { IBookview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Book } from "../../../domain/types/Book";

export class BookWeb implements IBookview {

    constructor(
        private bookservice: IService<Book>
    ) { }

    execute(): void {

    }
}