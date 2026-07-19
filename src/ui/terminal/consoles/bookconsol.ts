import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Book } from "../../../domain/types/Book";
import { prompt } from "../../../utils/prompt";

export class BookConsole implements IView {

    constructor(private bookservice: IAdditionalAction<Book>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.create();
                    break;

                case 2:
                    this.delete();
                    break;

                case 3:
                    this.read();
                    break;

                case 4:
                    this.update();
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

    private readBook(): Book {

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

    private create() {

        const book = this.readBook();

        const status = this.bookservice.create(book);

        if (status) {
            console.log("Libro registrado");
        } else {
            console.log("El libro ya existe.");
        }

    }

    private delete() {

        const id = prompt("ID: ");

        const status = this.bookservice.delete(id);

        if (status) {
            console.log("Libro eliminado");
        } else {
            console.log("No existe un libro con este id.");
        }

    }

    private update() {

        const book = this.readBook();

        const status = this.bookservice.update(book);

        if (status) {
            console.log("Libro actualizado");
        } else {
            console.log("No existe un libro con ese ID.");
        }

    }

    private findbyid() {

        const id = prompt("ID: ");

        const books = this.bookservice.findbyid(id);

        if (books.length === 0) {

            console.log("No encontrado");
            return;

        }

        console.table(books);

    }

    private read() {

        console.table(
            this.bookservice.read()
        );

    }

}
