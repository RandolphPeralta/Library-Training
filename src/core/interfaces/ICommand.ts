import { IView } from "./IView";

export interface ICommand {
  save(id: number, comando: IView): any;

  obtain(id: number): IView | undefined;
}
