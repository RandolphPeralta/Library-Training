import { IAccionadicional } from "../interfaces/IAccion";
import { LocalStorage } from 'node-localstorage';
(global as any).localStorage = new LocalStorage("./scratch");

export class LocalStoragePersistence<T> implements IAccionadicional<T> {
  constructor(private storageKey: string) {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private accessStorage(write?: T[]): T[] {
    try {
      if (write) {
        localStorage.setItem(this.storageKey, JSON.stringify(write));
        return write;
      }
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error en storage ${this.storageKey}:`, error);
      return [];
    }
  }

  guardar(some: any): boolean {
    const items = this.accessStorage();
    if (items.some((item: any) => item.id === some.id)) return false;
    items.push(some);
    this.accessStorage(items);
    return true;
  }

  eliminar(id: any): void {
    const items = this.accessStorage().filter((item: any) => item.id !== id);
    this.accessStorage(items);
  }

  actualizar(some: any): boolean {
    const items = this.accessStorage();
    const index = items.findIndex((item: any) => item.id === some.id);
    if (index === -1) return false;
    items[index] = some;
    this.accessStorage(items);
    return true;
  }

  mostrar(): T[] {
    return this.accessStorage();
  }

  buscarporid(id: string): T[] {
    return this.accessStorage().filter((item: any) => item.id === id);
  }
}