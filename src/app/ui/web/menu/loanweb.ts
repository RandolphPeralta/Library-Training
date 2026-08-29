import { ILoanview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Student } from "../../../domain/types/Student";
import { Book } from "../../../domain/types/Book";
import { Loan } from "../../../domain/types/Loan";

export class LoanWeb implements ILoanview {

    constructor(
        private studentservice: IService<Student>,
        private bookservice: IService<Book>,
        private loanservice: IService<Loan>
    ) { }

    execute(): void {
        this.attachEvents();
        this.attachSearchEvents();
        this.attachQuickSearchEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("loanForm") as HTMLFormElement;
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createLoan();
        });
    }

    private attachSearchEvents(): void {
        const studentSearch = document.getElementById("loanStudentSearch") as HTMLInputElement;
        const bookSearch = document.getElementById("loanBookSearch") as HTMLInputElement;

        studentSearch.addEventListener("input", () => {
            this.searchStudent(studentSearch.value);
        });

        bookSearch.addEventListener("input", () => {
            this.searchBook(bookSearch.value);
        });
    }

    private attachQuickSearchEvents(): void {
        const searchInput = document.getElementById("quickSearchLoanInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchLoanResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const activeLoans = this.loanservice.read().filter(loan => !loan.returndate);
            const matches = activeLoans.filter(loan =>
                loan.student.name.toLowerCase().includes(query) ||
                loan.student.identification.includes(query) ||
                loan.book.title.toLowerCase().includes(query) ||
                loan.book.author.toLowerCase().includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No hay préstamos pendientes que coincidan</div>`
                : matches.map(loan => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${loan.book.title}</strong><br>
                            <small class="text-muted">
                                Estudiante: ${loan.student.name} (${loan.student.identification})<br>
                                Préstamo: ${new Date(loan.loanDate).toLocaleDateString()}
                            </small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-success btn-quick-return" 
                                    data-id="${loan.id}" 
                                    data-bs-dismiss="modal">
                                Devolver
                            </button>
                        </div>
                    </div>
                `).join("");

            resultsContainer.querySelectorAll(".btn-quick-return").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;

                    if (confirm("¿Estás seguro de devolver este libro?")) {
                        this.returnBook(id);
                        searchInput.value = "";
                        resultsContainer.innerHTML = "";
                        const modal = (window as any).bootstrap.Modal.getInstance(
                            document.getElementById("searchLoanModal")!
                        );
                        if (modal) modal.hide();
                    }
                });
            });
        });
    }

    private searchStudent(search: string): void {
        const results = document.getElementById("loanStudentResults")!;
        const value = search.trim().toLowerCase();

        if (!value) {
            results.innerHTML = "";
            return;
        }

        const students = this.studentservice
            .read()
            .filter(student =>
                student.name.toLowerCase().includes(value) ||
                student.identification.includes(value)
            )
            .slice(0, 8);

        results.innerHTML = students.map(student => `
            <button
                type="button"
                class="list-group-item list-group-item-action"
                data-id="${student.id}">
                ${student.name} - ${student.identification}
            </button>
        `).join("");

        results.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id")!;
                const student = this.studentservice.read().find(student => student.id === id);
                if (!student) return;

                (document.getElementById("loanStudent") as HTMLInputElement).value = student.id;
                (document.getElementById("loanStudentSearch") as HTMLInputElement).value =
                    `${student.name} - ${student.identification}`;
                results.innerHTML = "";
            });
        });
    }

    private searchBook(search: string): void {
        const results = document.getElementById("loanBookResults")!;
        const value = search.trim().toLowerCase();

        if (!value) {
            results.innerHTML = "";
            return;
        }

        const books = this.bookservice
            .read()
            .filter(book =>
                book.available &&
                (book.title.toLowerCase().includes(value) ||
                    book.author.toLowerCase().includes(value))
            )
            .slice(0, 8);

        results.innerHTML = books.map(book => `
            <button
                type="button"
                class="list-group-item list-group-item-action"
                data-id="${book.id}">
                ${book.title} - ${book.author}
            </button>
        `).join("");

        results.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id")!;
                const book = this.bookservice.read().find(book => book.id === id);
                if (!book) return;

                (document.getElementById("loanBook") as HTMLInputElement).value = book.id;
                (document.getElementById("loanBookSearch") as HTMLInputElement).value =
                    `${book.title} - ${book.author}`;
                results.innerHTML = "";
            });
        });
    }

    private createLoan(): void {
        const studentId = (document.getElementById("loanStudent") as HTMLInputElement).value;
        const bookId = (document.getElementById("loanBook") as HTMLInputElement).value;

        const student = this.studentservice.read().find(student => student.id === studentId);
        const book = this.bookservice.read().find(book => book.id === bookId);

        if (!student || !book || !book.available) {
            this.showAlert("Error: Seleccione un libro disponible y un estudiante válido.", "danger");
            return;
        }

        const loan: Loan = {
            id: Math.random().toString(36).substring(2, 9),
            book,
            student,
            loanDate: new Date()
        };

        if (!this.loanservice.create(loan)) {
            this.showAlert("Error al procesar el préstamo.", "danger");
        } else {
            book.available = false;
            this.bookservice.update(book);
            this.showAlert("Préstamo registrado con éxito.", "success");

            (document.getElementById("loanStudent") as HTMLInputElement).value = "";
            (document.getElementById("loanStudentSearch") as HTMLInputElement).value = "";
            (document.getElementById("loanBook") as HTMLInputElement).value = "";
            (document.getElementById("loanBookSearch") as HTMLInputElement).value = "";

            this.renderTable();
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("loanModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();
    }

    private returnBook(loanId: string): void {
        const loans = this.loanservice.read();
        const loan = loans.find(loan => loan.id === loanId);

        if (!loan || loan.returndate) {
            this.showAlert("El préstamo no existe o ya fue devuelto.", "warning");
            return;
        }

        loan.returndate = new Date();
        this.loanservice.update(loan);

        loan.book.available = true;
        this.bookservice.update(loan.book);

        this.showAlert(`"${loan.book.title}" devuelto por ${loan.student.name}`, "success");
        this.renderTable();
    }

    private renderTable(): void {
        const tbody = document.getElementById("loanTableBody")!;
        let loans = this.loanservice.read();

        loans = loans.sort((loanA, loanB) => {
            if (loanA.returndate && !loanB.returndate) return 1;
            if (!loanA.returndate && loanB.returndate) return -1;
            return 0;
        });

        tbody.innerHTML = loans.length === 0
            ? `<tr><td colspan="6" class="text-center text-muted">No hay historial de préstamos.</td></tr>`
            : loans.map(loan => `
                <tr>
                    <td><small class="text-muted">${loan.id}</small></td>
                    <td>
                        <strong>${loan.book.title}</strong>
                        <br><small class="text-muted">${loan.book.author}</small>
                    </td>
                    <td>
                        ${loan.student.name}
                        <br><small class="text-muted">${loan.student.identification}</small>
                    </td>
                    <td>${new Date(loan.loanDate).toLocaleDateString()}</td>
                    <td>
                        ${loan.returndate
                    ? `<span class="text-success"> ${new Date(loan.returndate).toLocaleDateString()}</span>`
                    : `<span class="badge bg-warning text-dark">Pendiente</span>`
                }
                    </td>
                </tr>
            `).join("");
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("loanAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        setTimeout(() => {
            const alert = alertBox.querySelector('.alert');
            if (alert) {
                const bsAlert = (window as any).bootstrap.Alert.getOrCreateInstance(alert);
                bsAlert.close();
            }
        }, 5000);
    }
}