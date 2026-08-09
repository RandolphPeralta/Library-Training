export interface IValidation<T> {
    validate(item: T): boolean;
}