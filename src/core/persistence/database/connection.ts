import Database from "better-sqlite3";

export const db = new Database("biblioteca.db");

db.exec(`
CREATE TABLE IF NOT EXISTS estudiantes(
    id TEXT PRIMARY KEY,
    nombre TEXT,
    identificacion TEXT,
    grado TEXT
);

CREATE TABLE IF NOT EXISTS libros(
    id TEXT PRIMARY KEY,
    titulo TEXT,
    autor TEXT,
    disponible INTEGER
);

CREATE TABLE IF NOT EXISTS prestamos(
    id TEXT PRIMARY KEY,
    libro TEXT,
    estudiante TEXT,
    fechaPrestamo TEXT,
    fechaDevolucion TEXT
);
`);