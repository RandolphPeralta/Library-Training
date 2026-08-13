import { IView } from "../../../domain/interfaces/IView";

export class Menuweb implements IView {

    constructor(
        private studentMenu: IView,
        private bookMenu: IView,
        private loanMenu: IView
    ) {}

    execute(): void {

        const btnStudents =
            document.getElementById("menuStudents")!;

        const btnBooks =
            document.getElementById("menuBooks")!;

        const btnLoans =
            document.getElementById("menuLoans")!;


        btnStudents.addEventListener("click", (e) => {

            e.preventDefault();

            this.showView("studentView");

            this.studentMenu.execute();
        });


        btnBooks.addEventListener("click", (e) => {

            e.preventDefault();

            this.showView("bookView");

            this.bookMenu.execute();
        });


        btnLoans.addEventListener("click", (event) => {

            event.preventDefault();

            this.showView("loanView");

            this.loanMenu.execute();
        });


        this.showView("studentView");

        this.studentMenu.execute();
    }


    private showView(viewId: string): void {

        const views = [
            "studentView",
            "bookView",
            "loanView"
        ];


        views.forEach(id => {

            document
                .getElementById(id)!
                .classList.add("d-none");

        });


        document
            .getElementById(viewId)!
            .classList.remove("d-none");
    }
}