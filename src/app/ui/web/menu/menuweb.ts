import { IBookview, ILoanview, IMenuview, IStudentview, IView } from "../../../domain/interfaces/IView";

export class Menuweb implements IMenuview {

    constructor(
        private studentMenu: IStudentview,
        private bookMenu: IBookview,
        private loanMenu: ILoanview
    ) {}

    execute(): void {

        const btnStudents =
            document.getElementById("menuStudents")!;

        const btnBooks =
            document.getElementById("menuBooks")!;

        const btnLoans =
            document.getElementById("menuLoans")!;


        btnStudents.addEventListener("click", (event) => {

            event.preventDefault();

            this.showView("studentView");

            this.studentMenu.execute();
        });


        btnBooks.addEventListener("click", (event) => {

            event.preventDefault();

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