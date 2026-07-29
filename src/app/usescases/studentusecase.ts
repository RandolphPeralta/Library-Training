import { IStudentUseCase } from "../domain/interfaces/IUsescases";
import { IRepository } from "../domain/interfaces/IRepository";
import { Student } from "../domain/types/Student";
import { Loan } from "../domain/types/Loan";

export class StudentUseCase implements IStudentUseCase {
    constructor(
        private studentRepository: IRepository<Student>,
        private loanRepository: IRepository<Loan>
    ) { }

    register(student: Student): boolean {
        if (!student.id || !student.identification || !student.name) {
            return false;
        }
        return this.studentRepository.create(student);
    }

    erase(id: string) {
        const activeLoans = this.loanRepository.read().filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (activeLoans.length > 0) {
            return false;
        }

        return this.studentRepository.delete(id);
    }

    actualize(student: Student): boolean {
        return this.studentRepository.update(student);
    }

    show(): Student[] {
        return this.studentRepository.read();
    }

    getById(id: string) {
        return this.studentRepository.findbyid(id)[0];
    }
}