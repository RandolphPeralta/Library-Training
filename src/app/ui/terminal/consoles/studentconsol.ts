import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Student } from "../../../domain/types/Student";
import { prompt } from "../../../../utils/prompt";

export class StudentConsole implements IView {

    constructor(private studentservice: IAdditionalAction<Student>) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.createstudent();
                    break;

                case 2:
                    this.deletestudent();
                    break;

                case 3:
                    this.readstudents();
                    break;

                case 4:
                    this.updatestudent();
                    break;

                case 5:
                    this.findbyidstudent();
                    break;

                case 0:
                    run = false;
                    break;
            }

        }

    }

    private showMenu(): void {
        const opciones: string[] = [
            "1. Registrar estudiante",
            "2. Eliminar estudiante",
            "3. Ver estudiante",
            "4. Actualizar estudiante",
            "5. Buscar estudiante",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

    private inputstudent(): Student {

        const id = prompt("ID: ");
        const name = prompt("Nombre: ");
        const identification = prompt("Identificación: ");
        const schoolgrade = prompt("Grado Escolar: ");

        return {
            id,
            name,
            identification,
            schoolgrade

        };

    }

    private createstudent() {

        const student = this.inputstudent();

        const status = this.studentservice.create(student);

        if (status) {
            console.log("Estudiante registrado");
        } else {
            console.log("El estudiante ya existe.");
        }

    }

    private deletestudent() {

        const id = prompt("ID: ");

        const status = this.studentservice.delete(id);

        if (status) {
            console.log("Estudiante eliminado");
        } else {
            console.log("No existe un estudiante.");
        }

    }

    private updatestudent() {

        const student = this.inputstudent();

        const status = this.studentservice.update(student);

        if (status) {
            console.log("Estudiante actualizado");
        } else {
            console.log("No existe un estudiante con ese ID.");
        }

    }

    private findbyidstudent() {

        const id = prompt("ID: ");

        const students = this.studentservice.findbyid(id);

        if (students.length === 0) {

            console.log("No encontrado");
            return;

        }

        console.table(students);

    }

    private readstudents() {

        console.table(
            this.studentservice.read()
        );

    }

}