import { IAdditionalAction } from "./IAction";

export interface IExtraAction<T> extends IAdditionalAction<T> {
    createbyid(id: any, some: any): any;
    updatebyid(id: any, some: any): any;
}