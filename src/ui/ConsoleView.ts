export class ConsoleView {
  mensaje(): void {
    var opciones: string[] = [
      "1. Registrar Estudiante",
      "2. Eliminar Estudiante",
      "3. Ver Estudiantes",
      "4. Actualizar Estudiante",
      "5. Buscar Estudiante",
      "6. Registrar Libro",
      "7. Eliminar Libro",
      "8. Ver Libros",
      "9. Actualizar Libros",
      "10. Buscar Libro",
      "11. Prestar Libro",
      "12. Devolver Libro",
      "13. Mostrar Prestamos",
      "14. Buscar Prestamo",
      "15. Actualizar Prestamo",
      "0. Salir"
    ];

    console.log("Bienvenido al Sistema de Biblioteca ¿qué desea?");

    for (var opcion of opciones) {
      console.log(opcion);
    }
  }
}
