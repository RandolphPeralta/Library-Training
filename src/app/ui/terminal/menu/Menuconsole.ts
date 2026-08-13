import { IBookview, ILoanview, IMenuview, IStudentview} from "../../../domain/interfaces/IView";
import { prompt } from "../../../../utils/prompt";

export class MenuConsole implements IMenuview {

    constructor(
        private studentMenu: IStudentview,
        private bookMenu: IBookview,
        private loanMenu: ILoanview
    ) { }

    execute() {

        let run = true;

        while (run) {

            this.showMenu();

            const option = Number(prompt("Seleccione: "));

            switch (option) {

                case 1:
                    this.studentMenu.execute();
                    break;

                case 2:
                    this.bookMenu.execute();
                    break;

                case 3:
                    this.loanMenu.execute();
                    break;

                case 0:
                    run = false;
            }

        }

    }

    private showMenu(): void {
        console.log("\n=============================================");
        console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
        console.log("=============================================");
        const opciones: string[] = [
            "1. Registrar, Eliminar, Ver, Actualizar estudiante",
            "2. Registrar, Eliminar, Ver, Actualizar libro",
            "3. Prestar libro, Devolver libro,  Mostrar prestamos",
            "0. Salir"
        ];
        for (const opcion of opciones) {
            console.log(opcion);
        }
    }

}