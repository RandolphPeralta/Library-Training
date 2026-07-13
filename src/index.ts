import { MemoryRAM } from "./core/persistence/Memory";
import { Book } from "./types/Book";
import { Student } from "./types/Student";
import { Loan } from "./types/Loan";
import { MenuConsola } from "./ui/terminal/MenuConsola";
import { App } from "./app/app";

const Persistencebook = new MemoryRAM<Book>();
const Persistencestudent = new MemoryRAM<Student>();
const Persistenceloan = new MemoryRAM<Loan>();

const menu = new MenuConsola(Persistencestudent, Persistencebook, Persistenceloan);

const app = new App(menu);

app.run();
