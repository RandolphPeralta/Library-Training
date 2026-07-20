import { Student } from "./Student";
import { Book } from "./Book";

export type Loan = {
    id: string,
    book: Book,
    student: Student,
    loanDate: Date;
    returndate?: Date;
}