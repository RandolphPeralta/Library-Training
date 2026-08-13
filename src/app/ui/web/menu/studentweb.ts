import { IStudentview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Student } from "../../../domain/types/Student";
import { Loan } from "../../../domain/types/Loan";

export class StudentWeb implements IStudentview {

    constructor(
        private studentservice: IService<Student>,
        private loanservice: IService<Loan>
    ) { }

    execute(): void {
    }
}