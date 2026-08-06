import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistences/Memory";
import { Service } from "./app/application/services/Services";
import { Approbation } from "./app/application/approbation/Approbation";
import { Studentconsole } from "./app/ui/terminal/consoles/studentconsol";
import { Bookconsole } from "./app/ui/terminal/consoles/bookconsol";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsol";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";
import { App } from "./app/app";

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const studentapprobator = new Approbation<Student>();
const bookapprobator = new Approbation<Book>();
const loanapprobator = new Approbation<Loan>();

const loanservice = new Service<Loan>(repositoryloan, loanapprobator);
const studentservice = new Service<Student>(repositorystudent, studentapprobator);
const bookservice = new Service<Book>(repositorybook, bookapprobator);

const studentconsole = new Studentconsole(studentservice, loanservice);
const bookconsole = new Bookconsole(bookservice);
const loanconsole = new LoanConsole(studentservice, bookservice, loanservice);

const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

const app = new App(menu);
app.run();