import { Book } from "./types/Book";
import { Student } from "./types/Student";
import { Loan } from "./types/Loan";
import { MemoryRAM } from "./core/persistence/Memoryextra";
import { Studentnegocy } from "./ui/terminal/depence/usecase/studenusecase";
import { Booknegocy } from "./ui/terminal/depence/usecase/bookusecase";
import { Loannegocy } from "./ui/terminal/depence/usecase/loanusecase";
import { StudentConsole } from "./ui/terminal/depence/consoles/studentcons";
import { BookConsole } from "./ui/terminal/depence/consoles/bookconsol";
import { LoanConsole } from "./ui/terminal/depence/consoles/loanconsol";
import { MenuConsole } from "./ui/terminal/depence/menucons/Menuconsole";
import { App } from "./app/app";

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentusecase = new Studentnegocy(MemoryStudent);
const bookusecase = new Booknegocy(MemoryBook);
const loanusecase = new Loannegocy(MemoryLoan, MemoryBook, MemoryStudent);

const studentconsole = new StudentConsole(studentusecase);
const bookconsole = new BookConsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();