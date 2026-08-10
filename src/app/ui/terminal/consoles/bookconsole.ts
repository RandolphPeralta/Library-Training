import { IView } from "../../../domain/interfaces/IView";
import { Book } from "../../../domain/types/Book";
import { prompt } from "../../../../utils/prompt";
import { IService } from "../../../domain/interfaces/IServices";

export class Bookconsole implements IView {
    constructor(private bookservice: IService<Book>) { }

    execute() {
        let run = true;
        while (run) {
            this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.createbook();
                    break;
                case 2:
                    this.deletebook();
                    break;
                case 3:
                    this.updatebook();
                    break;
                case 4:
                    this.readbook();
                    break
                case 0:
                    run = false;
                    break;
            }
        }
    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Registrar libro",
            "2. Borrar libro",
            "3. Actualizar libro",
            "4. Mostrar libros",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private createbook() {
        const book = this.inputbook();
        let books = this.bookservice.read();
        let indexstudent = books.findIndex((item: Book) => item.id === book.id);

        if (indexstudent !== -1) {
            console.log("Este libro ya fue registrado con este id")
            return;
        }

        const result: boolean = this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private deletebook() {
        this.readbook();
        const id = this.inputid();
        let books: Book[] = this.bookservice.read();
        let book = books.filter(findbook => findbook.id = id)[0];
        if (!book.available) {
            console.log("El libro esta prestado y no posible eliminar");
            return;
        }

        const status: boolean = this.bookservice.delete(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    }

    private updatebook() {
        this.readbook();
        const id = this.inputid();
        let books = this.bookservice.read();
        let findbook = books.filter((item: Book) => item.id === id)[0];
        if (!findbook) {
            console.log("El libro no fue encontrado");
            return
        }
        const book = this.inputbook();
        book.id = findbook.id
        const newbook: boolean = this.bookservice.update(book);
        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
    }

    private readbook() {

        let books: Book[] = this.bookservice.read();
        let booksview = books.map(book => ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }));

        console.table(booksview);
    }

    private inputbook(): Book {

        let title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            console.log("El titulo no puede estar vacio");
        }

        let author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            console.log("El autor no puede estar vacío");
        }

        const available = true;
        const id = Math.random().toString();

        return {
            id,
            title,
            author,
            available
        };
    }

    private inputid() {
        let id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}