import { IService } from "../../domain/interfaces/IServices";
import { IValidation } from "../../domain/interfaces/IValidation";
import { IAddidionalaction } from "../../domain/interfaces/IAction";

export class Service<T> implements IService<T> {
    constructor(private repository: IAddidionalaction<T>, private validator: IValidation<T>) { }

    create(item: T): boolean {
        if (!this.validator.validate(item)) return false
        return this.repository.create(item);
    }

    read(): Array<T> {
        return this.repository.read();
    }

    update(item: T): boolean {
        if (!this.validator.validate(item)) return false
        return this.repository.update(item);
    }

    delete(id: any): boolean {
        return this.repository.delete(id)
    }

}