import { Memoria } from "./core/persistence/Memoria";
import { Libro } from "./types/Libro";
import { Estudiante } from "./types/Estudiante";
import { Prestamo } from "./types/Prestamo";
import { MenuConsola } from "./ui/terminal/MenuConsola";
import { App } from "./app/app";

const memoriaLibro = new Memoria<Libro>();
const memoriaEstudiante = new Memoria<Estudiante>();
const memoriaPrestamo = new Memoria<Prestamo>();

const menu = new MenuConsola(memoriaEstudiante, memoriaLibro, memoriaPrestamo);

const app = new App(menu);

app.run();
