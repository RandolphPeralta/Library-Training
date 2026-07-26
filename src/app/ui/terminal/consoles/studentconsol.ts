import { IView } from "../../../domain/interfaces/IView";
import { IAdditionalAction } from "../../../domain/interfaces/IAction";
import { Student } from "../../../domain/types/Student";
import { prompt } from "../../../../utils/prompt";

export class StudentConsole implements IView {

    constructor(private studentrepository: IAdditionalAction<Student>) { }

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
                    this.readstudent();
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
        const existing = this.studentrepository.findbyid(student.id);

        if (existing.length > 0) {
            console.log("El estudiante ya existe con este id");
        } else {
            this.studentrepository.create(student);
            console.log("Estudiante registrado")
        }
    }

    private deletestudent() {
        const id = prompt("ID: ");
        const status = this.studentrepository.delete(id);

        if (status) {
            console.log("Estudiante eliminado");
        } else {
            console.log("No existe un estudiante.");
        }

    }

    private updatestudent() {
        const student = this.inputstudent();
        const existing = this.studentrepository.findbyid(student.id);

        if (existing.length === 0) {
            console.log("Este estudiante no exite con este id")
        } else {
            this.studentrepository.update(student)
            console.log("Estudiante actualizado");
        }
    }

    private findbyidstudent() {
        const id = prompt("ID: ");
        const students = this.studentrepository.findbyid(id);

        if (students.length === 0) {

            console.log("No encontrado");
            return;
        }

        console.table(students);
    }

    private readstudent() {
        console.table(this.studentrepository.read());

    }

}