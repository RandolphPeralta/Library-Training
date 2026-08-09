import { IService } from "../../domain/interfaces/IServices";
import { IValidation } from "../../domain/interfaces/IValidation";
import { IAddidionalaction } from "../../domain/interfaces/IAction";

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>, private approbator: IValidation<T>) { }

    create(item: T) {
        if (!this.approbator.validate(item)) return false
        return this.repository.create(item);
    }

    read() {
        return this.repository.read();
    }

    update(item: T) {
        if (!this.approbator.validate(item)) return false
        return this.repository.update(item);
    }

    delete(id: any) {
        return this.repository.delete(id)
    }

}