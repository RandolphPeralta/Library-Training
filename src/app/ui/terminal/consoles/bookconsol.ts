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
                case 5:
                    this.searchbook();
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
            "5. Buscar libro",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private createbook() {
        const book = this.inputbook();
        const result: boolean = this.bookservice.create(book);
        console.log(result ? "Libro registrado" : "No se pudo registrar");
    }

    private deletebook() {
        const id = this.inputid()
        let books: Book[] = this.bookservice.read();
        let book = books.filter(findbook => findbook.id = id)[0];
        if (!book.available) {
            return;
        }

        const status: boolean = this.bookservice.delete(id);
        console.log(status ? "Libro eliminado" : "No se pudo eliminar");
    }

    private updatebook() {
        const student = this.inputbook();
        const newbook: boolean = this.bookservice.update(student);
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

    private searchbook() {
        const id = this.inputid()
        let students = this.bookservice.read();
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
            console.log("El ID no puede estar vacío");
        }

        const title = prompt("Titulo: ");
        if (!title || title.trim() === "") {
            console.log("El titulo no puede estar vacio");
        }

        const author = prompt("Autor: ");
        if (!author || author.trim() === "") {
            console.log("El autor no puede estar vacío");
        }
        const available = true;

        return {
            id,
            title,
            author,
            available
        };
    }

    private inputid() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}