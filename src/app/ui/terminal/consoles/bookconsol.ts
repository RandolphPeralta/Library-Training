import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Book } from "../../../domain/types/Book";
import { prompt } from "../../../../utils/prompt";

export class BookConsole implements IView {

    constructor(private bookrepository: IAdditionalAction<Book>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.createbook();
                    break;

                case 2:
                    this.deletebook();
                    break;

                case 3:
                    this.readbook();
                    break;

                case 4:
                    this.updatebook();
                    break;

                case 5:
                    this.findbyid();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Registrar libro",
            "2. Eliminar libro",
            "3. Ver libro",
            "4. Actualizar libro",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private inputbook(): Book {

        const id = prompt("ID: ");
        const title = prompt("Titulo: ");
        const author = prompt("Autor: ");
        const available = true

        return {
            id,
            title,
            author,
            available

        };
    }

    private createbook() {
        const book = this.inputbook();
        const existingbook = this.bookrepository.findbyid(book.id);

        if (existingbook.length > 0) {
            console.log("El libro ya existe con este id.");
        } else {
            this.bookrepository.create(book);
            console.log("Libro registrado");
        }
    }

    private readbook() {
        console.table(this.bookrepository.read());
    }

    private updatebook() {
        const book = this.inputbook();
        const existing = this.bookrepository.findbyid(book.id);

        if (existing.length === 0) {
            console.log("No existe un libro con ese ID.");
        } else {
            this.bookrepository.update(book);
            console.log("Libro actualizado");
        }
    }

    private deletebook() {
        const id = prompt("ID: ");
        const status = this.bookrepository.delete(id);

        if (status) {
            console.log("Libro eliminado");
        } else {
            console.log("No existe un libro con este id.");
        }
    }

    private findbyid() {
        const id = prompt("ID: ");
        const books = this.bookrepository.findbyid(id);

        if (books.length === 0) {
            console.log("No encontrado");
            return;
        }
        console.table(books);
    }
}