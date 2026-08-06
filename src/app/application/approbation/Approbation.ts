import { IApprobation } from "../../domain/interfaces/IApprobation";

export class Approbation<T> implements IApprobation<T> {
    approve(item: any) {
    for(const value of Object.values(item)){
        if(value === "" || value === null || value === undefined){
            return false;
        }
    }
    return true;
}
}