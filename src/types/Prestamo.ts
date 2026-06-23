import { Estudiante } from "./Estudiante";
import { Libro } from "./Libro";

export type Prestamo = {
    id: string,
    libro: Libro,
    estudiante: Estudiante,
    fechaPrestamo: Date; 
    fechaDevolucion?: Date;
}
