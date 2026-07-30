import { IView } from "../../../domain/interfaces/IView";
import { Book } from "../../../domain/types/Book";
import { prompt } from "../../../../utils/prompt";
import { IBookUseCase } from "../../../domain/interfaces/IUsescases";

export class Bookconsole implements IView {
    constructor(private bookusecase: IBookUseCase) { }

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

    private registerbook() {
        const student = this.inputbook();
        const result: boolean = this.bookusecase.register(student);
        if (!result) {
            console.log("El libro ya existe con este id")
        } else {
            console.log("Libro registrado")
        }
    }

    private erasebook() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const status: boolean = this.bookusecase.erase(id);
        if (!status) {
            console.log("El libro no se encuentra con este id")
        } else {
            console.log("Libro eliminado")
        }
    }

    private actualizebook() {
        const student = this.inputbook();
        const existing: boolean = this.bookusecase.actualize(student);
        if (!existing) {
            console.log("El Libro no fue encontrado y no fue actualizado")
        } else {
            console.log("Libro actualizado")
        }
    }

    private showbook() {

        let books: Book[] = this.bookusecase.show()

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
        let students = this.bookusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}