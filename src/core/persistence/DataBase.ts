import { IAccionadicional } from "../interfaces/IAccion";

export class BaseDatos<T> implements IAccionadicional<T> {

    guardar(item: T): boolean {
        // INSERT
        return true;
    }

    eliminar(id: string) {
        // DELETE
    }

    actualizar(item: any): boolean {
        // UPDATE
        return true;
    }

    mostrar(): T[] {
        // SELECT *
        return [];
    }

    buscarporid(id: string): T[] {
        // SELECT WHERE id=...
        return [];
    }
}
