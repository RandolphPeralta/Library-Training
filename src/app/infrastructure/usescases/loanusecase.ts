import { IUsecaseloan } from "../../domain/interfaces/IUsescases";
import { IAddidionalaction } from "../../domain/interfaces/IAction";
import { Book } from "../../domain/types/Book";
import { Student } from "../../domain/types/Student";
import { Loan } from "../../domain/types/Loan";

export class Loanusecase implements IUsecaseloan {
    constructor(
        private loanrepository: IAddidionalaction<Loan>,
        private bookrepository: IAddidionalaction<Book>,
        private studentrepository: IAddidionalaction<Student>) { }

    lendBook(bookId: string, studentId: string) {
        const idbook = bookId
        const book = this.bookrepository.findbyid(idbook)[0];

        if (!book) {
            return false;
        }

        if (!book.available) {
            return false;
        }

        const idstudent = studentId
        const student = this.studentrepository.findbyid(idstudent)[0];

        if (!student) {
            return false;
        }

        const loanDate = new Date();

        const loan: Loan = {
            id: Math.random().toString(),
            book,
            student,
            loanDate
        };

        const existingLoan = this.loanrepository.findbyid(loan.id);

        if (existingLoan.length > 0) {
            return false;
        }

        this.loanrepository.create(loan);

        book.available = false;
        this.bookrepository.update(book);

        return true
    }
    
    returnBook(bookId: string) {
        const loan = this.loanrepository.read().find(loan => loan.book.id === bookId);

        if (!loan) {
            return false;
        }

        loan.returndate = new Date();
        this.loanrepository.update(loan);
        loan.book.available = true;
        this.bookrepository.update(loan.book);

        return true
    }

    show() {
        return this.loanrepository.read();
    }
}