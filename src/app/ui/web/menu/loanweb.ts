import { ILoanview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Student } from "../../../domain/types/Student";
import { Book } from "../../../domain/types/Book";
import { Loan } from "../../../domain/types/Loan";

export class LoanWeb implements ILoanview {

    constructor(
        private studentservice: IService<Student>,
        private bookservice: IService<Book>,
        private loanservice: IService<Loan>
    ) {}

    execute(): void {

    }
}