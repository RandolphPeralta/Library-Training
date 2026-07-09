import { MenuAccion } from "../ui/terminal/MenuAccion";

export class App {
  constructor(private menu: MenuAccion) { }

  run() {
    this.menu.ejecutar();
  }

}