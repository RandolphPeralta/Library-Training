import { IService } from "../../domain/interfaces/IServices";
import { IAddidionalaction } from "../../domain/interfaces/IAction";

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>){}

    create(item: T) {
        return this.repository.create(item);
    }

    read() {
        return this.repository.read();
    }

    update(item: T) {
        return this.repository.update(item);
    }

    delete(id: any) {
        return this.repository.delete(id)
    }

}