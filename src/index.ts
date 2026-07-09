import { Memoria } from "./core/persistence/Memoria";
import { Libro } from "./types/Libro";
import { Estudiante } from "./types/Estudiante";
import { Prestamo } from "./types/Prestamo";
import { MenuAccion } from "./ui/terminal/MenuAccion";
import { App } from "./app/app";

const memoriaLibro = new Memoria<Libro>();
const memoriaEstudiante = new Memoria<Estudiante>();
const memoriaPrestamo = new Memoria<Prestamo>();

const menu = new MenuAccion(memoriaEstudiante, memoriaLibro, memoriaPrestamo);

const app = new App(menu);

app.run();