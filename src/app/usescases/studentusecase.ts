import { IStudentUseCase } from "../domain/interfaces/IUsescases";
import { IAddidionalaction } from "../domain/interfaces/IAction";
import { Student } from "../domain/types/Student";
import { Loan } from "../domain/types/Loan";

export class StudentUseCase implements IStudentUseCase {
    constructor(
        private studentrepository: IAddidionalaction<Student>,
        private loanrepository: IAddidionalaction<Loan>
    ) { }

    register(student: Student): boolean {
        if (!student.id || !student.identification || !student.name) {
            return false;
        }
        return this.studentrepository.create(student);
    }

    erase(id: string) {
        const activeLoans = this.loanrepository.read().filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (activeLoans.length > 0) {
            return false;
        }

        return this.studentrepository.delete(id);
    }

    actualize(student: Student): boolean {
        return this.studentrepository.update(student);
    }

    show(): Student[] {
        return this.studentrepository.read();
    }
}