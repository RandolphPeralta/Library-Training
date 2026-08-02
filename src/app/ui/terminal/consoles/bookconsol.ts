import { IView } from "../../../domain/interfaces/IView";
import { Book } from "../../../domain/types/Book";
import { prompt } from "../../../../utils/prompt";
import { IBookservice } from "../../../domain/interfaces/IServices";

export class Bookconsole implements IView {
    constructor(private bookservice: IBookservice) { }

    execute() {
        let run = true;
        while (run) {
            this.showMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.registerbook();
                    break;
                case 2:
                    this.erasebook();
                    break;
                case 3:
                    this.actualizebook();
                    break;
                case 4:
                    this.showbook();
                    break
                case 5:
                    this.searchbook();
                    break
                case 0:
                    run = false;
                    break;
            }
        }
    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Registrar libro",
            "2. Borrar libro",
            "3. Actualizar libro",
            "4. Mostrar libros",
            "5. Buscar libro",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private registerbook() {
        const student = this.inputbook();
        const result: boolean = this.bookservice.register(student);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private erasebook() {
        const id = prompt("ID: ");
        if (id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const status: boolean = this.bookservice.erase(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    }

    private actualizebook() {
        const student = this.inputbook();
        const newbook: boolean = this.bookservice.actualize(student);
        console.log(newbook ? "Libro actualizado" : "No se pudo actualizar");
    }

    private showbook() {

        let books: Book[] = this.bookservice.show()

        let booksview = books.map(book => ({
            id: book.id,
            titulo: book.title,
            autor: book.author,
            disponible: book.available ? "Sí" : "No"
        }));

        console.table(booksview);
    }

    private searchbook() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let students = this.bookservice.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }

    private inputbook(): Book {

        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            throw new Error("El titulo no puede estar vacío");
        }
        const author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            throw new Error("El autor no puede estar vacío");
        }
        const available = true;

        return {
            id,
            title,
            author,
            available
        };
    }

}