import { IAdditionalAction } from "../../core/interfaces/IAction";
import { IMenu } from "../../core/interfaces/IMenu";
import { prompt } from "../../utils/prompt";
import { Student } from "../../types/Student";
import { Book } from "../../types/Book";
import { Loan } from "../../types/Loan";

export class MenuConsole implements IMenu {
  constructor(
    private StudentPersistence: IAdditionalAction<Student>,
    private BookPersistence: IAdditionalAction<Book>,
    private LoanPersistence: IAdditionalAction<Loan>
  ) { }

  execute(): void {
    let star = true;

    while (star) {
      this.showMenu();
      const opcion = Number(prompt("Seleccione opción: "));

      switch (opcion) {
        case 1:
          this.Registerstudent();
          this.pause();
          break;

        case 2:
          this.deletestudent();
          this.pause();
          break;

        case 3:
          console.table(this.StudentPersistence.show());
          this.pause();
          break;

        case 4:
          this.Updatestudent();
          this.pause();
          break;

        case 5:
          this.Findstudent();
          this.pause();
          break;

        case 6:
          this.Registerbook();
          this.pause();
          break;

        case 7:
          this.Deletebook();
          this.pause();
          break;

        case 8:
          this.Showbooks();
          this.pause();
          break;

        case 9:
          this.Updatebook();
          this.pause();
          break;

        case 10:
          this.Searchforbook();
          this.pause();
          break;

        case 11:
          this.Lendbook();
          this.pause();
          break;

        case 12:
          this.Returnbook();
          this.pause();
          break;

        case 13:
          this.showLoans();
          this.pause();
          break;

        case 14:
          this.Findaloan();
          this.pause();
          break;

        case 15:
          this.updateLoan();
          this.pause();
          break;

        case 0:
          star = false;
          break;

        default:
          console.log("Opción inválida");
          this.pause();
      }
    }
  }

  private showMenu(): void {
    console.log("\n=============================================");
    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");
    console.log("=============================================");
    const opciones: string[] = [
      "1. Registrar estudiante",
      "2. Eliminar estudiante",
      "3. Ver estudiante",
      "4. Actualizar estudiante",
      "5. Buscar estudiante",
      "6. Registrar libro",
      "7. Eliminar libro",
      "8. Ver libros",
      "9. Actualizar libro",
      "10. Buscar libro",
      "11. Prestar libro",
      "12. Devolver libro",
      "13. Mostrar prestamos",
      "14. Buscar Prestamo",
      "15. Actualizar Prestamo",
      "0. Salir"
    ];
    for (const opcion of opciones) {
      console.log(opcion);
    }
  }

  private Registerstudent() {
    const id = String(prompt("ID: "));
    const name = String(prompt("Nombre: "));
    const identification = String(prompt("Identificación: "));
    const schoolgrade = String(prompt("Grado Escolar: "));

    const registrandoStudent: Student = {
      id: id,
      name: name,
      identification: identification,
      schoolgrade: schoolgrade
    }

    const Studentregistrado = this.StudentPersistence.save(registrandoStudent);

    if (Studentregistrado) {
      console.log("Estudiante registrado");
    } else {
      console.log("El Estudiante ya existe con este ID");
    }
  }

  private deletestudent() {
    const id = String(prompt("ID: "));
    this.StudentPersistence.delete(id)
    console.log("Estudiante Eliminado")
  }

  private Updatestudent() {
    const id = String(prompt("ID: "));
    const name = String(prompt("Nombre: "));
    const identification = String(prompt("Identificación: "));
    const schoolgrade = String(prompt("Grado Escolar: "));

    const Existingstudent: Student = {
      id: id,
      name: name,
      identification: identification,
      schoolgrade: schoolgrade
    };

    const Updatedstudent = this.StudentPersistence.update(Existingstudent);

    if (Updatedstudent) {
      console.log("Estudiante actualizado");
    } else {
      console.log("No existe un estudiante con ese ID");
    }
  }

  private Findstudent() {
    const id = String(prompt("ID Estudiante: "));
    const result = this.StudentPersistence.findbyid(id)

    if (result.length === 0) {
      console.log("Estudiante no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(Student => console.log(Student))
  }

  private Registerbook() {
    const id = String(prompt("ID: "));
    const title = String(prompt("Título: "));
    const author = String(prompt("Autor: "));

    const registrandoBook: Book = {
      id: id,
      title: title,
      author: author,
      available: true
    }

    const Bookregistrado = this.BookPersistence.save(registrandoBook);
    if (Bookregistrado) {
      console.log("Libro registrado");
    } else {
      console.log("El Libro ya existe con este ID");
    }
  }

  private Deletebook() {
    const idBook = String(prompt("ID Libro: "));
    this.BookPersistence.delete(idBook)
  }

  private Updatebook() {
    const id = String(prompt("ID del libro: "));
    const title = String(prompt("Título: "));
    const author = String(prompt("Autor: "));

    const ExistingBook: Book = {
      id: id,
      title: title,
      author: author,
      available: true
    };

    const UpdateBook = this.BookPersistence.update(ExistingBook);

    if (UpdateBook) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }

  private Showbooks() {
    const Books = this.BookPersistence.show();

    const ShowBooks = Books.map(Book => ({
      id: Book.id,
      title: Book.title,
      author: Book.author,
      available: Book.available ? "Sí" : "No"
    }));

    console.table(ShowBooks);
  }

  private Searchforbook() {
    const id = String(prompt("ID del libro: "));
    const result = this.BookPersistence.findbyid(id)

    if (result.length === 0) {
      console.log("Libro no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(Book => console.log(Book))
  }

  private Lendbook() {
    const idBook = String(prompt("ID del Libro: "));
    const idStudent = String(prompt("ID del Estudiante: "));

    const book = this.BookPersistence.findbyid(idBook)[0]

    if (!book) {
      console.log("El libro no existe")
      return
    }

    if (!book.available) {
      console.log("Libro no disponible")
      return
    }

    const student = this.StudentPersistence.findbyid(idStudent)[0]

    if (!student) {
      console.log("EL estudiante no existe")
      return
    }

    const Loan: Loan = {
      id: Math.random().toString(),
      book,
      student,
      loanDate: new Date()
    }

    const estado = this.LoanPersistence.save(Loan)

    if (!estado) {
      console.log("Error al prestar al libro")
      return
    }

    book.available = false
    this.BookPersistence.update(book)

    console.log("Libro prestado correctamente")
  }

  private Returnbook() {
    const idBook = String(prompt("ID del libro: "));
    const Loans = this.LoanPersistence.show()

    const Loan = Loans.find(borrowed =>
      borrowed.book.id === idBook && !borrowed.returndate
    )

    if (!Loan) {
      console.log("No hay préstamo activo para este libro")
      return
    }

    Loan.returndate = new Date()

    this.LoanPersistence.update(Loan)

    Loan.book.available = true
    this.BookPersistence.update(Loan.book)

    console.log("Libo devuelto correctamente")
  }

  private showLoans(): void {

    const Loans = this.LoanPersistence.show()

    console.log("\n===== PRÉSTAMOS =====")

    if (Loans.length === 0) {
      console.log("No hay préstamos")
      return
    }

    Loans.forEach(loan => {
      console.log({
        id: loan.id,
        Book: loan.book.title,
        Student: loan.student.name,
        fechaLoan: loan.loanDate,
        fechaDevolucion: loan.returndate || "Pendiente"
      })
    })
  }

  private Findaloan(): void {

    const idBook = String(prompt("ID del Libro: "));

    const Loans = this.LoanPersistence.show()

    const Loan = Loans.find(loan =>
      loan.book.id === idBook && !loan.returndate
    )

    if (!Loan) {
      console.log("Libro disponible (no prestado)")
      return
    }

    console.log("\n===== PRÉSTAMO ACTIVO =====")
    console.log({
      Book: Loan.book.title,
      Student: Loan.student.name,
      fecha: Loan.loanDate
    })
  }

  private updateLoan(): void {

    const id = String(prompt("ID del Prestamo: "));

    const Loans = this.LoanPersistence.show()

    const Loan = Loans.find(borrowed => borrowed.id === id)

    if (!Loan) {
      console.log("Préstamo no encontrado")
      return
    }

    const fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):")

    Loan.loanDate = new Date(fecha)

    const status = this.LoanPersistence.update(Loan)

    console.log(status ? "Préstamo actualizado" : "Error")
  }

  private pause() {
    prompt("\nPresiona ENTER para continuar...");
  }
}