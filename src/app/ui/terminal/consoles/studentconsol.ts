import { IView } from "../../../domain/interfaces/IView";
import { Student } from "../../../domain/types/Student";
import { prompt } from "../../../../utils/prompt";
import { IStudentUseCase } from "../../../domain/interfaces/IUsescases";

export class Studentconsole implements IView {
    constructor(private studentusecase: IStudentUseCase) { }

    execute() {
        let run = true;
        while (run) {
            this.showMenu();
            const option = Number(prompt("Seleccione: "));

            switch (option) {
                case 1:
                    this.registerStudent();
                    break;
                case 2:
                    this.erasestudent();
                    break;
                case 3:
                    this.actualizestudent();
                    break;
                case 4:
                    this.showstudent();
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

    private showMenu(): void {
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
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            console.log("El nombre solo puede contener letras");
        }

        const identification = prompt("Identificación: ");
        if (!/^\d+$/.test(identification)) {
            console.log("La identificación debe ser numérica");
        }

        const schoolgrade = prompt("Grado Escolar: ");
        if (!schoolgrade || schoolgrade.trim() === "") {
            console.log("El grado escolar no puede estar vacío");
        }

        return { id, name, identification, schoolgrade };
    }

    private registerStudent() {
        const student = this.inputstudent();
        const result: boolean = this.studentusecase.register(student);
        if (!result) {
            console.log("El estudiante no se puede registrar")
        } else {
            console.log("Estudiante registrado")
        }
    }

    private erasestudent() {
        const id = prompt("ID: ");
        if (!id || id.trim() === "") {
            throw new Error("El ID no puede estar vacío");
        }
        const status: boolean = this.studentusecase.erase(id);
        if (!status) {
            console.log("El estudiante no se encuentra con este id")
        } else {
            console.log("Estudiante Eliminado")
        }
    }

    private actualizestudent() {
        const student = this.inputstudent();
        const existing: boolean = this.studentusecase.actualize(student);
        if (!existing) {
            console.log("El estudiante no fue actualizado")
        } else {
            console.log("Estudiante actualizado")
        }
    }

    private showstudent() {
        let students: Student[] = this.studentusecase.show()
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
        let students = this.studentusecase.show();
        let student = students.filter((item: any) => item.id === id);
        if (student.length === 0) {
            console.log("No es posible encontrarlo")
        } else {
            console.table(student)
        }
    }
}