import { IView } from "../../../domain/interfaces/IView";

export class LoginWeb implements IView {

    constructor(
        private menuWeb: IView
    ) { }

    execute(): void {

        document.getElementById("loginForm")!.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = (document.getElementById("username") as HTMLInputElement).value;
            const pass = (document.getElementById("password") as HTMLInputElement).value;

            if (user === "admin" && pass === "1234") {
                document.getElementById("login")!.classList.add("d-none");
                document.getElementById("dashboard")!.classList.remove("d-none");
                this.menuWeb.execute();
            } else {
                alert("Credenciales incorrectas");
            }
        });

    }
}