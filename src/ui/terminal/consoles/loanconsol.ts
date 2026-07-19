import { IView } from "../../../domain/interfaces/IView";
import { IExtraAction } from "../../../domain/interfaces/IExtra";
import { Loan } from "../../../domain/types/Loan";
import { prompt } from "../../../utils/prompt";

export class LoanConsole implements IView {

    constructor(private loanservice: IExtraAction<Loan>) { }

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

    private create() {

        const idBook = prompt("ID Libro: ");

        const idStudent = prompt("ID Estudiante: ");

        const status = this.loanservice.createbyid(idBook, idStudent);

        if (status) {

            console.log("Libro prestado");

        } else {

            console.log("No fue posible realizar el préstamo");

        }

    }

    private delete() {

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

        const status = this.loanservice.updatebyid(id, date);

        console.log(
            status
                ? "Préstamo actualizado"
                : "No encontrado"
        );

    }

    private findbyid() {

        const idBook = prompt("ID Libro: ");

        const loan = this.loanservice.findbyid(idBook);

        if (!loan) {

            console.log("No existe prestamo");

            return;

        }

        console.table(loan);

    }
}