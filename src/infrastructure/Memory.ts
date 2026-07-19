import { IAdditionalAction } from "../domain/interfaces/IAction";

export class MemoryRAM<T> implements IAdditionalAction<T> {

  private memory: T[] = [];

  create(some: any): boolean {
    let index = this.memory.findIndex((item: any) => item.id === some.id);

    if (index !== -1) {
      return false;
    }

    this.memory.push(some)
    return true;
  }

  delete(id: any) {
    let index = this.memory.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.memory.splice(index, 1);
      return true
    } else {
      return false
    }
  }

  update(some: any): boolean {
    let index = this.memory.findIndex((item: any) => item.id === some.id);

    if (index === -1) {
      return false;
    }

    this.memory[index] = some;
    return true;
  }

  read(): T[] {
    return this.memory;
  }

  findbyid(id: string) {
    return this.memory.filter((item: any) => item.id === id)
  }
}