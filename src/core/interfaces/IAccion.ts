export interface IGuardado<T> {
  guardar(some: T): any;
  eliminar(id: any): any;
}

export interface IAccion<T> extends IGuardado<T>{
  actualizar(some: any): any;
  mostrar(): T[];
}

export interface IAccionadicional<T> extends IAccion<T> {
  buscarporid(id: string): Array<T>
}

export interface ICommand {
  execute(): any;
}