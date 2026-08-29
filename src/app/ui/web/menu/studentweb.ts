import { IStudentview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Student } from "../../../domain/types/Student";
import { Loan } from "../../../domain/types/Loan";

export class StudentWeb implements IStudentview {

    constructor(
        private studentservice: IService<Student>,
        private loanservice: IService<Loan>
    ) { }

    execute(): void {
        this.attachEvents();
        this.attachQuickSearchEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        const btnCancel = document.getElementById("studentBtnCancel") as HTMLButtonElement;
        const btnOpenModal = document.getElementById("btnOpenStudentModal") as HTMLButtonElement;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveStudent();
        });

        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });

        btnOpenModal.addEventListener("click", () => {
            this.resetForm();
        });
    }

    private saveStudent(): void {

        const editingId = (document.getElementById("studentEditingId") as HTMLInputElement).value;
        const name = (document.getElementById("studentName") as HTMLInputElement).value;
        const identification = (document.getElementById("studentIdent") as HTMLInputElement).value;
        const schoolgrade = (document.getElementById("studentGrade") as HTMLInputElement).value;

        if (editingId) {
            const student: Student = { id: editingId, name, identification, schoolgrade };
            if (this.studentservice.update(student)) {
                this.showAlert("Estudiante actualizado con éxito.", "success");
            } else {
                this.showAlert("Error al actualizar estudiante.", "danger");
            }
        } else {
            const student: Student = {
                id: Math.random().toString(36).substring(2, 9),
                name,
                identification,
                schoolgrade
            };
            if (this.studentservice.create(student)) {
                this.showAlert("Estudiante registrado con éxito.", "success");
            } else {
                this.showAlert("Error al registrar estudiante.", "danger");
            }
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("studentModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();

        this.resetForm();
        this.renderTable();
    }

    private editStudent(id: string): void {
        const student = this.studentservice.read().find(student => student.id === id);
        if (!student) return;

        (document.getElementById("studentEditingId") as HTMLInputElement).value = student.id;
        (document.getElementById("studentName") as HTMLInputElement).value = student.name;
        (document.getElementById("studentIdent") as HTMLInputElement).value = student.identification;
        (document.getElementById("studentGrade") as HTMLInputElement).value = student.schoolgrade;

        document.getElementById("studentFormTitle")!.textContent = "Actualizar Estudiante";
        document.getElementById("studentBtnSubmit")!.textContent = "Actualizar";

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("studentModal")!;
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.show();
    }

    private resetForm(): void {
        const form = document.getElementById("studentForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("studentEditingId") as HTMLInputElement).value = "";
        document.getElementById("studentFormTitle")!.textContent = "Registrar Estudiante";
        document.getElementById("studentBtnSubmit")!.textContent = "Guardar";
    }

    private renderTable(): void {
        const tbody = document.getElementById("studentTableBody")!;
        const students = this.studentservice.read();

        tbody.innerHTML = students.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay estudiantes registrados.</td></tr>`
            : students.map(student => `
                <tr>
                    <td><small class="text-muted">${student.id}</small></td>
                    <td>${student.name}</td>
                    <td>${student.identification}</td>
                    <td>${student.schoolgrade}</td>
                </tr>
            `).join("");
    }

    private deleteStudent(id: string): void {
        const activeLoans = this.loanservice.read().filter(loan => loan.student.id === id && !loan.returndate);
        if (activeLoans.length > 0) {
            this.showAlert("No se puede eliminar: El estudiante tiene préstamos activos.", "warning");
            return;
        }

        if (this.studentservice.delete(id)) {
            this.showAlert("Estudiante eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el estudiante.", "danger");
        }
    }

    private attachQuickSearchEvents(): void {
        const searchInput = document.getElementById("quickSearchStudentInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchStudentResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const students = this.studentservice.read();
            const matches = students.filter(student =>
                student.name.toLowerCase().includes(query) ||
                student.identification.includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No se encontraron estudiantes</div>`
                : matches.map(student => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${student.name}</strong><br>
                            <small class="text-muted">ID: ${student.identification} | Grado: ${student.schoolgrade}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-warning me-1 btn-quick-edit" data-id="${student.id}" data-bs-dismiss="modal">Editar</button>
                            <button class="btn btn-sm btn-outline-danger btn-quick-delete" data-id="${student.id}" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                  `).join("");

            resultsContainer.querySelectorAll(".btn-quick-edit").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.editStudent(id);
                });
            });

            resultsContainer.querySelectorAll(".btn-quick-delete").forEach(event => {
                event.addEventListener("click", (evt) => {
                    const id = (evt.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.deleteStudent(id);
                });
            });
        });
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("studentAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

}