export interface ISave<T> {
  create(some: T): boolean;
  delete(id: string): boolean;
}

export interface IUpdate<T> extends ISave<T>{
  update(some: T): boolean;
  read(): T[];
}

export interface IAddidionalaction<T> extends IUpdate<T> {
  findbyid(id: string): Array<T>;
}
