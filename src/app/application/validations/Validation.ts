import { IValidation } from "../../domain/interfaces/IValidation";

export class Validation<T extends object> implements IValidation<T> {
    validate(item: T): boolean {
    for(const value of Object.values(item)){
        if(value === "" || value === null || value === undefined){
            return false;
        }
    }
    return true;
}
}