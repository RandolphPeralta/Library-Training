import { IView } from "../../../domain/interfaces/IView";
import { Student } from "../../../domain/types/Student";
import { Book } from "../../../domain/types/Book";
import { Loan } from "../../../domain/types/Loan";
import { prompt } from "../../../../utils/prompt";
import { IUsecaseloan } from "../../../domain/interfaces/IUsescases";

export class LoanConsole implements IView {

    constructor(private usecaseloan: IUsecaseloan) { }

    execute() {
        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.createloan();
                    break;

                case 2:
                    this.eraseloan();
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

    private showMenu(): void {
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

    private createloan() {
        let idbook = prompt("ID Libro: ");
        if (!idbook || idbook.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let idstudent = prompt("ID Estudiante: ");
        if (!idstudent || idstudent.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let status = this.usecaseloan.lendBook(idbook, idstudent);
        if (!status) {
            console.log("No se puede hacer el prestamo")
        } else {
            console.log("Prestamo exitoso")
        }
    }

    private eraseloan() {
        const idBook = prompt("ID Libro: ");
        let status = this.usecaseloan.returnBook(idBook);
        if (!status) {
            console.log("No se pudo devoler")
        } else {
            console.log("Libro devuelto")
        }
    }

    private readloan() {
        let loans: Loan[] = this.usecaseloan.show()
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