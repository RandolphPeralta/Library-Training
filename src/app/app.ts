import { IMenu } from "../core/interfaces/IMenu";

export class App {
  constructor(private menu: IMenu) { }

  run() {
    this.menu.execute();
  }
}