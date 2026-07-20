import { Book } from "./types/Book";
import { Student } from "./types/Student";
import { Loan } from "./types/Loan";
import { MemoryRAM } from "./infrastructure/persistence/Memory";
import { Studentnegocy } from "./application/services/studentservice";
import { Booknegocy } from "./application/services/bookservice";
import { Loannegocy } from "./application/services/loanservice";
import { StudentConsole } from "./ui/terminal/consoles/studentconsol";
import { BookConsole } from "./ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./ui/terminal/menu/Menuconsole";
import { App } from "./application/app/app";

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