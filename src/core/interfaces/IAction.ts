export interface ISave<T> {
  create(some: T): any;
  delete(id: any): any;
}

export interface IAction<T> extends ISave<T>{
  update(some: any): any;
  read(): T[];
}

export interface IAdditionalAction<T> extends IAction<T> {
  findbyid(id: string): Array<T>
}
