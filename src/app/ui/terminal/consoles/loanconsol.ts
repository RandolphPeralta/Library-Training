import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Student } from "../../../domain/types/Student";
import { Book } from "../../../domain/types/Book";
import { Loan } from "../../../domain/types/Loan";
import { prompt } from "../../../../utils/prompt";

export class LoanConsole implements IView {

    constructor(
        private loanrepository: IAdditionalAction<Loan>, 
        private bookrepository: IAdditionalAction<Book>, 
        private studentrepository: IAdditionalAction<Student>) { }

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
                    this.readloan();
                    break;

                case 4:
                    this.updateloan();
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
        const book = this.bookrepository.findbyid(idbook)[0];

        if (!book) {
            console.log("El libro no existe");
            return;
        }

        if (!book.available) {
            console.log("El libro no está disponible");
            return;
        }

        const idstudent = prompt("ID Estudiante: ");
        const student = this.studentrepository.findbyid(idstudent)[0];

        if (!student) {
            console.log("El estudiante no existe");
            return;
        }

        const loanDate = new Date();
        const returndate = new Date(loanDate);
        returndate.setDate(loanDate.getDate() + 3);

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate,
            returndate
        };

        const existingLoan = this.loanrepository.findbyid(loan.id);

        if (existingLoan.length > 0) {
            console.log("Ya existe un préstamo con ese id");
            return;
        }

        this.loanrepository.create(loan);

        book.available = false;
        this.bookrepository.update(book);

        console.log("Libro prestado con devolución en 3 días");
    }

    private returnbook() {

        const idBook = prompt("ID Libro: ");
        const loan = this.loanrepository.read().find(loan => loan.book.id === idBook);

        if (!loan) {
            console.log("No existe préstamo activo");
            return;
        }

        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);

        console.log("Libro devuelto");
    }

    private readloan() {

        const Loans = this.loanrepository.read()

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

    private updateloan() {

        const id = prompt("ID préstamo: ");

        const existing = this.loanrepository.findbyid(id);
        if (existing.length === 0) {
            console.log("Préstamo no encontrado");
            return;
        }

        const loan = existing[0];
        loan.returndate = new Date(prompt("Fecha (YYYY-MM-DD): "));
        this.loanrepository.update(loan);
        console.log("Préstamo actualizado");
    }

    private findbyid() {

        const idloan = prompt("ID préstamo: ");
        const loans = this.loanrepository.findbyid(idloan);

        if (loans.length === 0) {
            console.log("No encontrado");
            return;
        }

        loans.forEach(loan => {
            console.log({
                id: loan.id,
                Book: loan.book.title,
                Student: loan.student.name,
                fechaLoan: loan.loanDate,
                fechaDevolucion: loan.returndate
            });
        });
    }
}