import { Book } from "./entities/types/Book";
import { Student } from "./entities/types/Student";
import { Loan } from "./entities/types/Loan";
import { MemoryRAM } from "./frameworks&drivers/persistence/Memory";
import { Studentusecase } from "./usescases/studentusecase";
import { Bookusecase } from "./usescases/bookusecase";
import { Loanusecase } from "./usescases/loanusecase";
import { StudentConsole } from "./frameworks&drivers/ui/terminal/consoles/studentconsol";
import { BookConsole } from "./frameworks&drivers/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./frameworks&drivers/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./frameworks&drivers/ui/terminal/menu/Menuconsole";
import { App } from "./app";

const MemoryBook = new MemoryRAM<Book>();
const MemoryStudent = new MemoryRAM<Student>();
const MemoryLoan = new MemoryRAM<Loan>();

const studentusecase = new Studentusecase(MemoryStudent);
const bookusecase = new Bookusecase(MemoryBook);
const loanusecase = new Loanusecase(MemoryLoan, MemoryBook, MemoryStudent);

const studentconsole = new StudentConsole(studentusecase);
const bookconsole = new BookConsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase, bookusecase, studentusecase);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();