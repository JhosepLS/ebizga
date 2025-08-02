package org.biblioteca.jhosep_backend.service;

import org.biblioteca.jhosep_backend.model.Libro;

import java.util.List;

public interface LibroServiceInterface {
    Libro crear(Libro libro);
    List<Libro> listar();
    List<Libro> listarDisponibles();
    Libro obtenerPorId(Long id);
    List<Libro> buscarPorTitulo(String titulo);
}