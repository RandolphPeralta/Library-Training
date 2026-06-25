import { Memoria } from "./core/persistence/Memoria";
import { LocalStoragePersistence } from "./core/persistence/Localstorage";
import { Libro } from "./types/Libro";
import { Estudiante } from "./types/Estudiante";
import { Prestamo } from "./types/Prestamo";
import { MenuAccion } from "./ui/terminal/MenuAccion";
import { ConsoleView } from "./ui/terminal/ConsoleView";
import { App } from "./app/terminal/app";

const memoriaLibro = new Memoria<Libro>();
const memoriaEstudiante = new Memoria<Estudiante>();
const memoriaPrestamo = new Memoria<Prestamo>();

const localstorageLibro = new LocalStoragePersistence<Libro>("libro")
const localstorageEstudiante = new LocalStoragePersistence<Estudiante>("Estudiante")
const localstoragePrestamo = new LocalStoragePersistence<Prestamo>("Prestamo")

const menu = new MenuAccion(memoriaEstudiante, memoriaLibro, memoriaPrestamo);

const view = new ConsoleView();
const app = new App(menu, view);

app.run();