import { IAdditionalAction } from "../entities/interfaces/IAction";
import { Loan } from "../entities/types/Loan";
import { Student } from "../entities/types/Student";
import { Book } from "../entities/types/Book";

export class Loanusecase implements IAdditionalAction<Loan> {

    constructor(private loanservice: IAdditionalAction<Loan>, private bookservice: IAdditionalAction<Book>, private studentservice: IAdditionalAction<Student>) { }

    create(loan: Loan): boolean {
        const book = loan.book;
        if (!book || !book.available) {
            return false;
        }

        const findbook = this.bookservice.findbyid(book.id)[0];
        if (!findbook) {
            return false;
        }

        const student = loan.student;
        if (!student) {
            return false;
        }

        const existingLoan = this.loanservice.findbyid(loan.id);
        if (existingLoan.length > 0) {
            return false;
        }

        const status = this.loanservice.create(loan);
        if (!status) {
            return false;
        }

        findbook.available = false;
        this.bookservice.update(findbook);

        return true;
    }


    findbyid(idloan: string): Loan[] {
        return this.loanservice.findbyid(idloan)
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

    read(): Loan[] {
        return this.loanservice.read();
    }
    
    delete(idbook: any) {
        const loan = this.loanservice.read().find(loan => loan.book.id === idbook);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();

        this.loanservice.update(loan);

        loan.book.available = true;

        this.bookservice.update(loan.book);

        return true;
    }

}