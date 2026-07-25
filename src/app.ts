import { IView } from "./entities/interfaces/IView";

export class App {
  constructor(private menu: IView) { }

  run() {
    this.menu.execute();
  }
}