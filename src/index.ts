import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistence/Memory";
import { Studentservice } from "./app/application/services/studentservice";
import { Bookservice } from "./app/application/services/bookservice";
import { Loanservice } from "./app/application/services/loanservice";
import { StudentConsole } from "./app/ui/terminal/consoles/studentconsol";
import { BookConsole } from "./app/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";
import { App } from "./app/app";

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentservice = new Studentservice(MemoryStudent);
const bookservice = new Bookservice(MemoryBook);
const loanservice = new Loanservice(MemoryLoan, MemoryBook, MemoryStudent);

const studentconsole = new StudentConsole(studentservice);
const bookconsole = new BookConsole(bookservice);
const loanconsole = new LoanConsole(loanservice, bookservice, studentservice);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();