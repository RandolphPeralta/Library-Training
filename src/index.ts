import { Memoria } from "./core/persistence/Memoria";
import { Libro } from "./types/Libro";
import { Estudiante } from "./types/Estudiante";
import { Prestamo } from "./types/Prestamo";
import { MenuAccion } from "./ui/MenuAccion";
import { ConsoleView } from "./ui/ConsoleView";
import { App } from "./app/app";

const memoriaLibro = new Memoria<Libro>();
const memoriaEstudiante = new Memoria<Estudiante>();
const memoriaPrestamo = new Memoria<Prestamo>();

const menu = new MenuAccion(memoriaEstudiante, memoriaLibro, memoriaPrestamo);

const view = new ConsoleView();
const app = new App(menu, view);

app.run();