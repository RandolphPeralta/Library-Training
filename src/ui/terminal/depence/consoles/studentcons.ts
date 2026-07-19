import { IView } from "../../../../core/interfaces/IView";
import { IAdditionalAction } from "../../../../core/interfaces/IAction";
import { Student } from "../../../../types/Student";
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
                    this.create();
                    break;

                case 2:
                    this.delete();
                    break;

                case 3:
                    this.read();
                    break;

                case 4:
                    this.update();
                    break;

                case 5:
                    this.findbyid();
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

    private readStudent(): Student {

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

    private create() {

        const student = this.readStudent();

        const status = this.studentservice.create(student);

        if (status) {
            console.log("Estudiante registrado");
        } else {
            console.log("El estudiante ya existe.");
        }

    }

    private delete() {

        const id = prompt("ID: ");

        const status = this.studentservice.delete(id);

        if (status) {
            console.log("Estudiante eliminado");
        } else {
            console.log("No existe un estudiante.");
        }

    }

    private update() {

        const student = this.readStudent();

        const status = this.studentservice.update(student);

        if (status) {
            console.log("Estudiante actualizado");
        } else {
            console.log("No existe un estudiante con ese ID.");
        }

    }

    private findbyid() {

        const id = prompt("ID: ");

        const students = this.studentservice.findbyid(id);

        if (students.length === 0) {

            console.log("No encontrado");
            return;

        }

        console.table(students);

    }

    private read() {

        console.table(
            this.studentservice.read()
        );

    }

}