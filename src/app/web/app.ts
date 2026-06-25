import { MenuAccion } from "../../ui/web/MenuWeb";

export class App {
  constructor(private menu: MenuAccion) { }

  run(): void {
    let continuar = true;

    while (continuar) {
      const opcion = Number(window.prompt("Bienvenidos al sistema de biblioteca\n1. Registrar Estudiante\n2. Eliminar Estudiante\n3. Ver Estudiantes\n4. Actualizar Estudiante\n5. Buscar Estudiante\n6. Registrar Libro\n7. Eliminar Libro\n8. Ver Libros\n9. Actualizar Libros\n10. Buscar Libro\n11. Prestar Libro\n12. Devolver Libro\n13. Mostrar Prestamos\n14. Buscar Prestamo\n15. Actualizar Prestamo\n0. Salir\n Seleccione una opcion: "));
      continuar = this.menu.ejecutar(opcion);
    }
  }
}
