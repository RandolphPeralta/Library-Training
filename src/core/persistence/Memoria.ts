import { IAccionadicional } from "../interfaces/IAccion";

export class Memoria<T> implements IAccionadicional<T> {

  private memoria: T[] = [];

  guardar(some: any): boolean {
    let index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    this.memoria.push(some)
    return true;
  }

  eliminar(id: any) {
    let index = this.memoria.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.memoria.splice(index, 1);
    }
  }

  actualizar(some: any): boolean {
    let index = this.memoria.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    this.memoria[index] = some;
    return true;
  }

  mostrar(): T[] {
    return this.memoria;
  }
  
  buscarporid(id: string) {
        return this.memoria.filter((item: any) => item.id === id)
    }
}
