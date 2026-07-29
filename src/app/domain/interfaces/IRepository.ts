export interface ISave<T> {
  create(some: T): any;
  delete(id: any): any;
}

export interface IUpdate<T> extends ISave<T>{
  update(some: any): any;
  read(): T[];
}

export interface IRepository<T> extends IUpdate<T> {
  findbyid(id: string): Array<T>;
}
