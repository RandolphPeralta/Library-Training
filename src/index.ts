import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistences/Memory";
import { Loanusecase } from "./app/infrastructure/usescases/loanusecase";
import { StudentUseCase } from "./app/infrastructure/usescases/studentusecase";
import { BookUseCase } from "./app/infrastructure/usescases/bookusecase";
import { Studentconsole } from "./app/ui/terminal/consoles/studentconsol";
import { Bookconsole } from "./app/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";
import { App } from "./app/app";

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const loanusecase = new Loanusecase(repositoryloan, repositorybook, repositorystudent)
const studentusecase = new StudentUseCase(repositorystudent, repositoryloan)
const bookusecase = new BookUseCase(repositorybook)

const studentconsoletest = new Studentconsole(studentusecase);
const bookconsoletest = new Bookconsole(bookusecase);
const loanconsole = new LoanConsole(loanusecase)

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);

const app = new App(menu);
app.run();