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
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private createStudent() {
        const student = this.inputstudent();
        let students = this.studentservice.read();
        let findstudent = students.findIndex((item: Student) => item.id === student.id);

        if (findstudent !== -1) {
            console.log("Este estudiante ya fue registrado con este id")
            return;
        }

        const result: boolean = this.studentservice.create(student);
        console.log(result ? "Estudiante registrado" : "No se pudo registrar");
    }

    private deletestudent() {
        this.readstudent();
        const id = this.inputid();
        let activeLoans: Loan[] = this.loanservice.read();
        let studentactiveloan = activeLoans.filter(loanstudent => loanstudent.student.id === id && !loanstudent.returndate);

        if (studentactiveloan.length > 0) {
            console.log("El estudiante no puede ser eliminado, ya que tiene prestamos")
            return;
        }

        const status: boolean = this.studentservice.delete(id);
        console.log(status ? "Estudiante eliminado" : "No se pudo eliminar");
    }

    private updatestudent() {
        this.readstudent();
        const id = this.inputid();
        let students = this.studentservice.read();
        let findstudent = students.filter((item: Student) => item.id === id)[0];
        if (!findstudent) {
            console.log("Estudiante no encontrado");
            return;
        }

        const student = this.inputstudent();
        student.id = findstudent.id
        const newstudent: boolean = this.studentservice.update(student);
        console.log(newstudent ? "Estudiante actualizado" : "No se pudo actualizar");
    }

    private readstudent() {
        let students: Student[] = this.studentservice.read();
        let studentsview = students.map(student => ({
            id: student.id,
            nombre: student.name,
            identificacion: student.identification,
            grado: student.schoolgrade
        }));

        console.table(studentsview);
    }

    private inputstudent(): Student {

        const name = prompt("Nombre: ");
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre no puede estar vacio y solo puede contener letras");
        }

        const identification = prompt("Identificación: ");
        if (!identification || !/^\d+$/.test(identification)) {
            console.log("La identificación no puede estar vacio y debe ser numérica");
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade) {
            console.log("El grado escolar no puede estar vacío");
        }

        const id = Math.random().toString();

        return { id, name, identification, schoolgrade };
    }

    private inputid() {
        const id = prompt("ID: ");
        if (!id) {
            console.log("El ID no puede estar vacío");
        }
        return id
    }
}