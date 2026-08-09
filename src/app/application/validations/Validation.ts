import { IValidation } from "../../domain/interfaces/IValidation";

export class Validation<T> implements IValidation<T> {
    validate(item: any) {
    for(const value of Object.values(item)){
        if(value === "" || value === null || value === undefined){
            return false;
        }
    }
    return true;
}
}