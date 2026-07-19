import { IView } from "../domain/interfaces/IView";

export class App {
  constructor(private menu: IView) { }

  run() {
    this.menu.execute();
  }
}