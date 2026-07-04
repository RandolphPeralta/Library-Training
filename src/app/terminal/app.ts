import { MenuAccion } from "../../ui/terminal/MenuAccion";
import { ConsoleView } from "../../ui/terminal/ConsoleView";
import { prompt } from "../../utils/prompt";

export class App {
  constructor(private menu: MenuAccion, private view: ConsoleView) { }

  run(): void {
    let continuar = true;

    while (continuar) {
      this.view.mensaje();
      const opcion = Number(prompt("Seleccione opción: "));
      continuar = this.menu.ejecutar(opcion);
    }
  }
}