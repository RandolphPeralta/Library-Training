export interface IService<T> {
    create(item: T): any;
    read(): any;
    update(item: T): any;
    delete(id: any): any;
}