import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Student } from "../../../types/Student";
import { Book } from "../../../types/Book";
import { Loan } from "../../../types/Loan";
import { prompt } from "../../../utils/prompt";

export class LoanConsole implements IView {

    constructor(
        private loanservice: IAdditionalAction<Loan>,
        private bookservice: IAdditionalAction<Book>,
        private studentservice: IAdditionalAction<Student>) { }

    execute() {
        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.lendbook();
                    break;

                case 2:
                    this.returnbook();
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
            "1. Prestar libro",
            "2. Devolver libro",
            "3. Ver prestamos",
            "4. Actualizar prestamo",
            "5. Buscar prestamo",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private lendbook() {

        const idbook = prompt("ID Libro: ");

        const idstudent = prompt("ID Estudiante: ");

        const loan: Loan = {

            id: Math.random().toString(),
            book: this.bookservice.findbyid(idbook)[0],
            student: this.studentservice.findbyid(idstudent)[0],
            loanDate: new Date()

        };

        const status = this.loanservice.create(loan);

        if (status) {

            console.log("Libro prestado");

        } else {

            console.log("No fue posible realizar el préstamo");

        }

    }

    private returnbook() {

        const idBook = prompt("ID Libro: ");

        const status = this.loanservice.delete(idBook);

        console.log(
            status
                ? "Libro devuelto"
                : "No existe préstamo activo"
        );

    }

    private read() {

        const Loans = this.loanservice.read()

        console.log("\n===== PRÉSTAMOS =====")

        if (Loans.length === 0) {
            console.log("No hay préstamos")
            return
        }

        Loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })

    }

    private update() {

        const id = prompt("ID préstamo: ");

        const date = new Date(
            prompt("Fecha (YYYY-MM-DD): ")
        );

        const loan: Loan = {
            id: id,
            book: this.loanservice.findbyid(id)[0].book,
            student: this.loanservice.findbyid(id)[0].student,
            loanDate: this.loanservice.findbyid(id)[0].loanDate,
            returndate: date
        };

        const status = this.loanservice.update(loan);

        console.log(
            status
                ? "Préstamo actualizado"
                : "No encontrado"
        );

    }

    private findbyid() {

        const idloan = prompt("ID del prestamo: ");

        const loan = this.loanservice.findbyid(idloan);

        if (!loan) {

            console.log("Libro disponible");

            return;

        }

        loan.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate || "Pendiente"
            })
        })

    }
}