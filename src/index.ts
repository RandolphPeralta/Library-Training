import { Book } from "./app/domain/types/Book";
import { Student } from "./app/domain/types/Student";
import { Loan } from "./app/domain/types/Loan";
import { MemoryRAM } from "./app/infrastructure/persistences/Memory";
import { Service } from "./app/application/services/Services";
import { Validation } from "./app/application/validations/Validation";

import { Studentconsole } from "./app/ui/terminal/consoles/studentconsole";
import { Bookconsole } from "./app/ui/terminal/consoles/bookconsole";
import { LoanConsole } from "./app/ui/terminal/consoles/loanconsole";
import { MenuConsole } from "./app/ui/terminal/menu/Menuconsole";

import { StudentWeb } from "./app/ui/web/menu/studentweb";
import { BookWeb } from "./app/ui/web/menu/bookweb";
import { LoanWeb } from "./app/ui/web/menu/loanweb";
import { Menuweb } from "./app/ui/web/menu/menuweb";
import { LoginWeb } from "./app/ui/web/loggin/logginweb";

import { App } from "./app/app";

const repositorybook = new MemoryRAM<Book>();
const repositorystudent = new MemoryRAM<Student>();
const repositoryloan = new MemoryRAM<Loan>();

const studentvalidator = new Validation<Student>();
const bookvalidator = new Validation<Book>();
const loanvalidator = new Validation<Loan>();

const loanservice = new Service<Loan>(repositoryloan, loanvalidator);
const studentservice = new Service<Student>(repositorystudent, studentvalidator);
const bookservice = new Service<Book>(repositorybook, bookvalidator);

// const studentconsole = new Studentconsole(studentservice, loanservice);
// const bookconsole = new Bookconsole(bookservice);
// const loanconsole = new LoanConsole(studentservice, bookservice, loanservice);

// const menu = new MenuConsole(studentconsole, bookconsole, loanconsole);

// const app = new App(menu);
// app.run();

const studentWeb = new StudentWeb(studentservice, loanservice);
const bookWeb = new BookWeb(bookservice);
const loanWeb = new LoanWeb(studentservice, bookservice, loanservice);

const menuWeb = new Menuweb(studentWeb, bookWeb, loanWeb);

const loginweb = new LoginWeb(menuWeb);

const app = new App(loginweb);
app.run();