import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistence/Memory";
import { Studentnegocy } from "./app/application/services/studentservice";
import { Booknegocy } from "./app/application/services/bookservice";
import { Loannegocy } from "./app/application/services/loanservice";
import { StudentConsole } from "./app/ui/terminal/consoles/studentconsol";
import { BookConsole } from "./app/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";
import { App } from "./app/app";

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentusecase = new Studentnegocy(MemoryStudent);
const bookusecase = new Booknegocy(MemoryBook);
const loanusecase = new Loannegocy(MemoryLoan, MemoryBook, MemoryStudent);

const studentconsole = new StudentConsole(studentusecase);
const bookconsole = new BookConsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase, bookusecase, studentusecase);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();