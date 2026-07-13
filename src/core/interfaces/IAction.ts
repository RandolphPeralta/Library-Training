export interface ISave<T> {
  save(some: T): any;
  delete(id: any): any;
}

export interface IAction<T> extends ISave<T>{
  update(some: any): any;
  show(): T[];
}

export interface IAdditionalAction<T> extends IAction<T> {
  findbyid(id: string): Array<T>
}
