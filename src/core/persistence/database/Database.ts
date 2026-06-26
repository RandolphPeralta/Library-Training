import { IAccionadicional } from "../../interfaces/IAccion";

import { db } from "./connection";

export class DatabasePersistence<T> implements IAccionadicional<T>{

    constructor(private table: string) {}

    guardar(item: any): boolean {

    const columnas = Object.keys(item);
    const valores = Object.values(item);

    const placeholders = columnas.map(() => "?").join(",");

    const sql = `
        INSERT INTO ${this.table}
        (${columnas.join(",")})
        VALUES (${placeholders})
    `;

    try{

        db.prepare(sql).run(...valores);

        return true;

    }catch{

        return false;

    }

}

eliminar(id: string): void {

    db.prepare(`
        DELETE FROM ${this.table}
        WHERE id=?
    `).run(id);

}

mostrar(): T[] {

    return db.prepare(`
        SELECT *
        FROM ${this.table}
    `).all() as T[];

}

buscarporid(id: string): T[] {

    return db.prepare(`
        SELECT *
        FROM ${this.table}
        WHERE id=?
    `).all(id) as T[];

}

actualizar(item: any): boolean {

    const columnas = Object.keys(item)
        .filter(c => c !== "id")
        .map(c => `${c}=?`)
        .join(",");

    const valores = Object.keys(item)
        .filter(c => c !== "id")
        .map(c => item[c]);

    valores.push(item.id);

    try{

        db.prepare(`
            UPDATE ${this.table}
            SET ${columnas}
            WHERE id=?
        `).run(...valores);

        return true;

    }catch{

        return false;

    }

}
}