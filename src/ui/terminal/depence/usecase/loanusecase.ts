import { IExtraAction } from "../../../../core/interfaces/IExtra";
import { Loan } from "../../../../types/Loan";
import { Student } from "../../../../types/Student";
import { Book } from "../../../../types/Book";

export class Loannegocy implements IExtraAction<Loan> {

    constructor(private loanservice: IExtraAction<Loan>, private bookservice: IExtraAction<Book>, private studentservice: IExtraAction<Student>) { }

    create(Loan: Loan) {
        const existingLoan = this.loanservice.findbyid(Loan.id);
        if (existingLoan.length > 0) {
            return false
        }
        this.loanservice.create(Loan);
        return true
    }

    createbyid(idBook: string, idStudent: string): boolean {

        const book = this.bookservice.findbyid(idBook)[0];

        if (!book) {
            return false;
        }

        if (!book.available) {
            return false;
        }

        const student = this.studentservice.findbyid(idStudent)[0];

        if (!student) {
            return false;
        }

        const loan: Loan = {

            id: Math.random().toString(),
            book,
            student,
            loanDate: new Date()

        };

        const status = this.create(loan);

        if (!status) {
            return false;
        }

        book.available = false;

        this.bookservice.update(book);

        return true;

    }

    update(loan: Loan) {
        const existingLoan = this.loanservice.findbyid(loan.id);
        if (existingLoan.length > 0) {
            this.loanservice.update(loan)
            return true
        } else {
            return false
        }
    }

    updatebyid(id: any, date: Date) {
        const loan = this.loanservice.findbyid(id)[0];

        if (!loan) {
            return false;
        }

        loan.loanDate = date;

        return this.update(loan);
    }

    delete(idBook: string) {
        const loan = this.loanservice.read().find(loan => loan.book.id === idBook && !loan.returndate);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();

        this.loanservice.update(loan);

        loan.book.available = true;

        this.bookservice.update(loan.book);

        return true;
    }

    read(): Loan[] {
        return this.loanservice.read();
    }

    findbyid(idBook: string): Loan[] {
        return this.loanservice.findbyid(idBook);
    }

}