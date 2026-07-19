import { IAdditionalAction } from "../../../../core/interfaces/IAction";
import { Student } from "../../../../types/Student";

export class Studentnegocy implements IAdditionalAction<Student> {

    constructor(private studentPersistence: IAdditionalAction<Student>) { }

    create(student: Student): boolean {

        const existing = this.studentPersistence.findbyid(student.id);

        if (existing.length > 0) {
            return false;
        }

        return this.studentPersistence.create(student);
    }

    delete(id: string): boolean {

        return this.studentPersistence.delete(id);

    }

    update(student: Student): boolean {

        const existing = this.studentPersistence.findbyid(student.id);

        if (existing.length === 0) {
            return false;
        }

        return this.studentPersistence.update(student);

    }

    read(): Student[] {

        return this.studentPersistence.read();

    }

    findbyid(id: string): Student[] {

        return this.studentPersistence.findbyid(id);

    }

}