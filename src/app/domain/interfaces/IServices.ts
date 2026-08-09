export interface IService<T> {
    create(item: T): boolean;   
    read(): Array<T>;
    update(item: T): boolean;
    delete(id: string): boolean;
}