import { IAccionadicional } from "../core/interfaces/IAccion";
import { prompt } from "../utils/prompt";
import { Estudiante } from "../types/Estudiante";
import { Libro } from "../types/Libro";
import { Prestamo } from "../types/Prestamo";

export class MenuAccion {
  constructor(
    private servicioEstudiante: IAccionadicional<Estudiante>,
    private servicioLibro: IAccionadicional<Libro>,
    private servicioPrestamo: IAccionadicional<Prestamo>
  ) { }

  ejecutar(opcion: number): boolean {
    switch (opcion) {
      case 1:
        this.registrarEstudiante();
        this.pause();
        break;

      case 2:
        this.eliminarEstudiante();
        this.pause();
        break

      case 3:
        console.table(this.servicioEstudiante.mostrar());
        this.pause();
        break;

      case 4:
        this.actualizarEstudiante()
        this.pause();
        break;

      case 5:
        this.buscarEstudiante()
        this.pause();
        break;

      case 6:
        this.registrarLibro();
        this.pause();
        break;

      case 7:
        this.elmiminarLibro();
        this.pause();
        break

      case 8:
        this.mostrarLibros();
        this.pause();
        break;

      case 9:
        this.actualizarlibro();
        this.pause();
        break

      case 10:
        this.buscarLibro()
        this.pause();
        break;

      case 11:
        this.prestarLibrob();
        this.pause();
        break;

      case 12:
        this.devolverLibrob();
        this.pause();
        break;

      case 13:
        this.mostrarPrestamos();
        this.pause();
        break;
      
      case 14:
        this.encontrarPrestamoPorLibro();
        this.pause();
        break;

      case 15:
        this.actualizarPrestamo();
        this.pause();
        break;
      
      case 0:
        return false;

      default:
        console.log("Opción inválida");
    }

    return true;
  }

  private registrarEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const registrandoestudiante: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    }

    const estudianteregistrado = this.servicioEstudiante.guardar(registrandoestudiante);

    if (estudianteregistrado) {
      console.log("Estudiante registrado");
    } else {
      console.log("El estudiante ya existe con este ID");
    }
  }

  private eliminarEstudiante() {
    const id = String(prompt("ID: "));
    this.servicioEstudiante.eliminar(id)
    console.log("Estudiante Eliminado")
  }

  private actualizarEstudiante() {
    const id = String(prompt("ID: "));
    const nombre = String(prompt("Nombre: "));
    const identificacion = String(prompt("Identificación: "));
    const grado = String(prompt("Grado: "));

    const estudiantexistente: Estudiante = {
      id: id,
      nombre: nombre,
      identificacion: identificacion,
      grado: grado
    };

    const estudianteactualizado = this.servicioEstudiante.actualizar(estudiantexistente);

    if (estudianteactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }

  private buscarEstudiante() {
    const id = String(prompt("ID Estudiante: "));
    const result = this.servicioEstudiante.buscarporid(id)

    if (result.length === 0) {
      console.log("Estudiante no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(estudiante => console.log(estudiante))
  }

  private registrarLibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const registrandolibro: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    }

    const libroregistrado = this.servicioLibro.guardar(registrandolibro);
    if (libroregistrado) {
      console.log("Libro registrado");
    } else {
      console.log("El Libro ya existe con este ID");
    }
  }

  private elmiminarLibro() {
    const idLibro = String(prompt("ID Libro: "));
    this.servicioLibro.eliminar(idLibro)
  }

  private actualizarlibro() {
    const id = String(prompt("ID Libro: "));
    const titulo = String(prompt("Título: "));
    const autor = String(prompt("Autor: "));

    const libroexistente: Libro = {
      id: id,
      titulo: titulo,
      autor: autor,
      disponible: true
    };

    const libroactualizado = this.servicioLibro.actualizar(libroexistente);

    if (libroactualizado) {
      console.log("Libro actualizado");
    } else {
      console.log("No existe un libro con ese ID");
    }
  }

  private mostrarLibros() {
    const libros = this.servicioLibro.mostrar();

    const librosVista = libros.map(libro => ({
      id: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      disponible: libro.disponible ? "Sí" : "No"
    }));

    console.table(librosVista);
  }

  private buscarLibro() {
    const id = String(prompt("ID Libro: "));
    const result = this.servicioLibro.buscarporid(id)

    if (result.length === 0) {
      console.log("Libro no encontrado")
      return
    }

    console.log("\n===== RESULTADO =====")
    result.forEach(libro => console.log(libro))
  }

  private prestarLibrob() {
    const idLibro = String(prompt("ID Libro: "));
    const idEstudiante = String(prompt("ID Estudiante: "));

    const libro = this.servicioLibro.buscarporid(idLibro)[0]

    if (!libro) {
      console.log("Libro no existe")
      return
    }

    if (!libro.disponible) {
      console.log("Libro no disponible")
      return
    }

    const estudiante = this.servicioEstudiante.buscarporid(idEstudiante)[0]

    if (!estudiante) {
      console.log("Estudiante no existe")
      return
    }

    const prestamo: Prestamo = {
      id: Math.random().toString(),
      libro,
      estudiante,
      fechaPrestamo: new Date()
    }

    const estado = this.servicioPrestamo.guardar(prestamo)

    if (!estado) {
      console.log("Error al prestar libro")
      return
    }

    libro.disponible = false
    this.servicioLibro.actualizar(libro)

    console.log("Libro prestado correctamente")
  }

  private devolverLibrob() {
    const idLibro = String(prompt("ID Libro: "));
    const prestamos = this.servicioPrestamo.mostrar()

    const prestamo = prestamos.find(prestado =>
      prestado.libro.id === idLibro && !prestado.fechaDevolucion
    )

    if (!prestamo) {
      console.log("No hay préstamo activo para este libro")
      return
    }

    prestamo.fechaDevolucion = new Date()

    this.servicioPrestamo.actualizar(prestamo)

    prestamo.libro.disponible = true
    this.servicioLibro.actualizar(prestamo.libro)

    console.log("Libro devuelto correctamente")
  }

  private mostrarPrestamos(): void {

    const prestamos = this.servicioPrestamo.mostrar()

    console.log("\n===== PRÉSTAMOS =====")

    if (prestamos.length === 0) {
      console.log("No hay préstamos")
      return
    }

    prestamos.forEach(p => {
      console.log({
        id: p.id,
        libro: p.libro.titulo,
        estudiante: p.estudiante.nombre,
        fechaPrestamo: p.fechaPrestamo,
        fechaDevolucion: p.fechaDevolucion || "Pendiente"
      })
    })
  }

  private encontrarPrestamoPorLibro(): void {

    const idLibro = String(prompt("ID Libro: "));

    const prestamos = this.servicioPrestamo.mostrar()

    const prestamo = prestamos.find(p =>
      p.libro.id === idLibro && !p.fechaDevolucion
    )

    if (!prestamo) {
      console.log("Libro disponible (no prestado)")
      return
    }

    console.log("\n===== PRÉSTAMO ACTIVO =====")
    console.log({
      libro: prestamo.libro.titulo,
      estudiante: prestamo.estudiante.nombre,
      fecha: prestamo.fechaPrestamo
    })
  }

  private actualizarPrestamo(): void {

    const id = String(prompt("ID del prestamo: "));

    const prestamos = this.servicioPrestamo.mostrar()

    const prestamo = prestamos.find(prestado => prestado.id === id)

    if (!prestamo) {
      console.log("Préstamo no encontrado")
      return
    }

    const fecha = prompt("Ingrese nueva fecha devolución (YYYY-MM-DD):")

    prestamo.fechaDevolucion = new Date(fecha)

    const status = this.servicioPrestamo.actualizar(prestamo)

    console.log(status ? "Préstamo actualizado" : "Error")
  }

  private pause() {
    prompt("\nPresiona ENTER para continuar...");
  }

}