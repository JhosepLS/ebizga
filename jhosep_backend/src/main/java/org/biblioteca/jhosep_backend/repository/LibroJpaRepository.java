package org.biblioteca.jhosep_backend.repository;

import org.biblioteca.jhosep_backend.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LibroJpaRepository extends JpaRepository<Libro, Long> {
    Optional<Libro> findByCodigo(String codigo);

    @Query("SELECT l FROM Libro l WHERE l.stock > 0 AND l.estado = 'DISPONIBLE'")
    List<Libro> findAllDisponibles();

    List<Libro> findByTituloContainingIgnoreCase(String titulo);
}