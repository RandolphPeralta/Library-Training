import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistences/Memory";
import { Service } from "./app/application/services/Services";
import { Studentconsole } from "./app/ui/terminal/consoles/studentconsol";
import { Bookconsole } from "./app/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";
import { App } from "./app/app";

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const loanservice = new Service<Loan>(repositoryloan);
const studentservice = new Service<Student>(repositorystudent);
const bookservice = new Service<Book>(repositorybook);

const studentconsoletest = new Studentconsole(studentservice, loanservice);
const bookconsoletest = new Bookconsole(bookservice);
const loanconsole = new LoanConsole(studentservice, bookservice,loanservice);

const menu = new MenuConsole(studentconsoletest, bookconsoletest, loanconsole);

const app = new App(menu);
app.run();