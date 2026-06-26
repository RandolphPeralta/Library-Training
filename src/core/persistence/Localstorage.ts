import { IAccionadicional } from "../interfaces/IAccion";
import { LocalStorage } from 'node-localstorage';
(global as any).localStorage = new LocalStorage("./scratch");

export class LocalStoragePersistence<T> implements IAccionadicional<T> {

  constructor(private storageKey: string) {
    this.storageKey = storageKey;
    this.initializeStorage();
  }

  private initializeStorage(): void {
    try {
      if (!localStorage.getItem(this.storageKey)) {
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      }
    } catch (error) {
      console.error(`Error inicializando localStorage para ${this.storageKey}:`, error);
    }
  }

  private getAll(): T[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error leyendo datos de ${this.storageKey}:`, error);
      return [];
    }
  }

  private saveAll(items: T[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error(`Error guardando datos en ${this.storageKey}:`, error);
    }
  }

  guardar(some: any): boolean {
    const items = this.getAll();
    const index = items.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    items.push(some);
    this.saveAll(items);
    return true;
  }

  eliminar(id: any): void {
    let items = this.getAll();
    items = items.filter((item: any) => item.id !== id);
    this.saveAll(items);
  }

  actualizar(some: any): boolean {
    const items = this.getAll();
    const index = items.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    items[index] = some;
    this.saveAll(items);
    return true;
  }

  mostrar(): T[] {
    return this.getAll();
  }

  buscarporid(id: string): T[] {
    const items = this.getAll();
    return items.filter((item: any) => item.id === id);
  }
}