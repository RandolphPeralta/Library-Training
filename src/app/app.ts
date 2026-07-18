import { IView } from "../core/interfaces/IView";

export class App {
  constructor(private menu: IView) { }

  run() {
    this.menu.execute();
  }
}