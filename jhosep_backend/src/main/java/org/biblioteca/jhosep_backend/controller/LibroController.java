package org.biblioteca.jhosep_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.biblioteca.jhosep_backend.controller.dto.CrearLibroRequest;
import org.biblioteca.jhosep_backend.model.Libro;
import org.biblioteca.jhosep_backend.service.LibroServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroServiceInterface libroService;

    public LibroController(LibroServiceInterface libroService) {
        this.libroService = libroService;
    }

    @PostMapping
    public ResponseEntity<?> crear(@Validated @RequestBody CrearLibroRequest request) {
        try {
            Libro libro = new Libro();
            libro.setTitulo(request.getTitulo());
            libro.setCodigo(request.getCodigo());
            libro.setAutor(request.getAutor());
            libro.setStock(request.getStock());

            Libro guardado = libroService.crear(libro);
            return ApiResponse.success(guardado, "Libro creado exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        List<Libro> libros = libroService.listar();
        return ApiResponse.success(libros, "Libros obtenidos exitosamente").toResponseEntity();
    }

    @GetMapping("/disponibles")
    public ResponseEntity<?> listarDisponibles() {
        List<Libro> libros = libroService.listarDisponibles();
        return ApiResponse.success(libros, "Libros disponibles obtenidos exitosamente").toResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        try {
            Libro libro = libroService.obtenerPorId(id);
            return ApiResponse.success(libro, "Libro encontrado").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.NOT_FOUND.value()).toResponseEntity();
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorTitulo(@RequestParam String titulo) {
        List<Libro> libros = libroService.buscarPorTitulo(titulo);
        return ApiResponse.success(libros, "Búsqueda completada").toResponseEntity();
    }
}