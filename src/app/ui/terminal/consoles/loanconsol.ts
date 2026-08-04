import { IView } from "../../../domain/interfaces/IView";
import { Loan } from "../../../domain/types/Loan";
import { Book } from "../../../domain/types/Book";
import { Student } from "../../../domain/types/Student";
import { prompt } from "../../../../utils/prompt";
import { IService } from "../../../domain/interfaces/IServices";

export class LoanConsole implements IView {

    constructor(private studentservice: IService<Student>, private bookservice: IService<Book> , private loanservice: IService<Loan>) { }

    execute() {
        let run = true;

        while (run) {

            this.readMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.lendbook();
                    break;

                case 2:
                    this.returnbook();
                    break;

                case 3:
                    this.readloan();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private lendbook() {

        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
            return
        }

        let idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            console.log("El ID no puede estar vacío");
            return
        }

        let books: Book[] = this.bookservice.read();
        const book = books.filter((book: any) => book.id === idbook)[0];

        if (!book) {
            return;
        }

        if (!book.available) {
            return;
        }

        let students: Student[] = this.studentservice.read();
        const student = students.filter((student: Student) => student.id === idstudent)[0];

        if (!student) {
            return false;
        }

        let loanDate = new Date();

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate
        };

        let status = this.loanservice.create(loan);
        book.available = false;
        this.bookservice.update(book);

        console.log(status? "Prestamo existoso" : "No se pudo realizar el prestamo");
    }

    private returnbook() {
        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            console.log("El ID no puede estar vacío");
            return idbook
        }
        let loans: Loan[] = this.loanservice.read()
        const loan = loans.find(loan => loan.book.id === idbook);
        if (!loan) {
            console.log("El libro no existe con este id")
            return;
        }

        loan.returndate = new Date();
        const status = this.loanservice.update(loan);
        loan.book.available = true;
        this.bookservice.update(loan.book);
        console.log(status? "Libro devuelto" : "No se pudo devolver")
    }

    private readloan() {
        let loans: Loan[] = this.loanservice.read()
        console.log("\n===== PRÉSTAMOS =====")

        if (loans.length === 0) {
            console.log("No hay préstamos")
            return
        }

        loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaprestamo: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })
    }
}