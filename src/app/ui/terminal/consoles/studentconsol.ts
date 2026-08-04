import { IView } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Student } from "../../../domain/types/Student";
import { prompt } from "../../../../utils/prompt";
import { Loan } from "../../../domain/types/Loan";

export class Studentconsole implements IView {
    constructor(private studentservice: IService<Student>, private loanservice: IService<Loan>) { }

    execute() {
        let run = true;
        while (run) {
            this.readMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.createStudent();
                    break;
                case 2:
                    this.deletestudent();
                    break;
                case 3:
                    this.updatestudent();
                    break;
                case 4:
                    this.readstudent();
                    break
                case 5:
                    this.searchstudent();
                    break
                case 0:
                    run = false;
                    break;
            }
        }
    }

    private readMenu(): void {
        const opciones: string[] = [
            "1. Registrar estudiante",
            "2. Borrar estudiante",
            "3. Actualizar estudiante",
            "4. Mostrar estudiantes",
            "5. Buscar estudiate",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private inputstudent(): Student {

        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
        }

        const name = prompt("Nombre: ");
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
        }

        const identification = prompt("Identificación: ");
        if (!identification || !/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade || schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
        }

        return { id, name, identification, schoolgrade };
    }

    private createStudent() {
        const student = this.inputstudent();
        if (!student.id || !student.identification || !student.name || !student.schoolgrade) {
            return;
        }
        const result: boolean = this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private deletestudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            console.log("El ID no puede estar vacío");
            return;
        }

        let activeLoans: Loan[] = this.loanservice.read();
        let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (studentactiveloan.length > 0) {
            return;
        }

        const status: boolean = this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo registrar");
    }

    private updatestudent() {
        const student = this.inputstudent();
        const newstudent: boolean = this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
    }

    private readstudent() {
        let students: Student[] = this.studentservice.read()
        let studentsview = students.map(student => ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }));

        console.table(studentsview);
    }

    private searchstudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        let students = this.studentservice.read();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }

}