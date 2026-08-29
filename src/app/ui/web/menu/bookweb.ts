import { IBookview } from "../../../domain/interfaces/IView";
import { IService } from "../../../domain/interfaces/IServices";
import { Book } from "../../../domain/types/Book";

export class BookWeb implements IBookview {

    constructor(private bookservice: IService<Book>) { }

    execute(): void {
        this.attachEvents();
        this.attachQuickSearchEvents();
        this.renderTable();
    }

    private attachEvents(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        const btnCancel = document.getElementById("bookBtnCancel") as HTMLButtonElement;
        const btnOpenModal = document.getElementById("btnOpenBookModal") as HTMLButtonElement;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.saveBook();
        });

        btnCancel.addEventListener("click", () => {
            this.resetForm();
        });

        btnOpenModal.addEventListener("click", () => {
            this.resetForm();
        });
    }

    private editBook(id: string): void {
        const book = this.bookservice.read().find(book => book.id === id);
        if (!book) return;

        (document.getElementById("bookEditingId") as HTMLInputElement).value = book.id;
        (document.getElementById("bookTitle") as HTMLInputElement).value = book.title;
        (document.getElementById("bookAuthor") as HTMLInputElement).value = book.author;

        document.getElementById("bookFormTitle")!.textContent = "Actualizar Libro";
        document.getElementById("bookBtnSubmit")!.textContent = "Actualizar";

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("bookModal")!;
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
        modalInstance.show();
    }

    private saveBook(): void {
        const editingId = (document.getElementById("bookEditingId") as HTMLInputElement).value;
        const title = (document.getElementById("bookTitle") as HTMLInputElement).value;
        const author = (document.getElementById("bookAuthor") as HTMLInputElement).value;

        if (editingId) {
            const existingBook = this.bookservice.read().find(book => book.id === editingId);
            const book: Book = {
                id: editingId,
                title,
                author,
                available: existingBook ? existingBook.available : true
            };

            if (this.bookservice.update(book)) {
                this.showAlert("Libro actualizado.", "success");
            } else {
                this.showAlert("Error al actualizar libro.", "danger");
            }
        } else {
            const book: Book = {
                id: Math.random().toString(36).substring(2, 9),
                title,
                author,
                available: true
            };

            if (this.bookservice.create(book)) {
                this.showAlert("Libro registrado.", "success");
            } else {
                this.showAlert("Error al registrar libro.", "danger");
            }
        }

        const bootstrap = (window as any).bootstrap;
        const modalElement = document.getElementById("bookModal")!;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal(modalElement);
        modalInstance.hide();

        this.resetForm();
        this.renderTable();
    }

    private resetForm(): void {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        form.reset();
        (document.getElementById("bookEditingId") as HTMLInputElement).value = "";
        document.getElementById("bookFormTitle")!.textContent = "Registrar Libro";
        document.getElementById("bookBtnSubmit")!.textContent = "Guardar";
    }

    private renderTable(): void {
        const tbody = document.getElementById("bookTableBody")!;
        const books = this.bookservice.read();

        tbody.innerHTML = books.length === 0
            ? `<tr><td colspan="5" class="text-center text-muted">No hay libros registrados.</td></tr>`
            : books.map(book => `
                <tr>
                    <td><small class="text-muted">${book.id}</small></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <span class="badge ${book.available ? 'bg-success' : 'bg-warning text-dark'}">
                            ${book.available ? 'Disponible' : 'Prestado'}
                        </span>
                    </td>
                </tr>
            `).join("");
    }

    private deleteBook(id: string): void {
        const book = this.bookservice.read().find(book => book.id === id);
        if (book && !book.available) {
            this.showAlert("No se puede eliminar: El libro está prestado actualmente.", "warning");
            return;
        }

        if (this.bookservice.delete(id)) {
            this.showAlert("Libro eliminado.", "info");
            this.renderTable();
        } else {
            this.showAlert("No se pudo eliminar el libro.", "danger");
        }
    }

    private attachQuickSearchEvents(): void {
        const searchInput = document.getElementById("quickSearchBookInput") as HTMLInputElement;
        if (!searchInput) return;

        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            const resultsContainer = document.getElementById("quickSearchBookResults")!;

            if (query.length < 2) {
                resultsContainer.innerHTML = "";
                return;
            }

            const books = this.bookservice.read();
            const matches = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.includes(query)
            ).slice(0, 5);

            resultsContainer.innerHTML = matches.length === 0
                ? `<div class="list-group-item text-muted">No se encontraron libros</div>`
                : matches.map(book => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${book.title}</strong><br>
                            <small class="text-muted">Autor: ${book.author}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-warning me-1 btn-quick-edit" data-id="${book.id}" data-bs-dismiss="modal">Editar</button>
                            <button class="btn btn-sm btn-outline-danger btn-quick-delete" data-id="${book.id}" data-bs-dismiss="modal">Eliminar</button>
                        </div>
                    </div>
                  `).join("");

            resultsContainer.querySelectorAll(".btn-quick-edit").forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const id = (event.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.editBook(id);
                });
            });

            resultsContainer.querySelectorAll(".btn-quick-delete").forEach(e => {
                e.addEventListener("click", (evt) => {
                    const id = (evt.currentTarget as HTMLElement).getAttribute("data-id")!;
                    this.deleteBook(id);
                });
            });
        });
    }

    private showAlert(msg: string, type: string): void {
        const alertBox = document.getElementById("bookAlert")!;
        alertBox.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}