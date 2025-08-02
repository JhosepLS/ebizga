package org.biblioteca.jhosep_backend.repository;

import org.biblioteca.jhosep_backend.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservaJpaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioId(Long usuarioId);

    @Query("SELECT r FROM Reserva r WHERE r.usuario.id = :usuarioId AND r.libro.id = :libroId")
    Optional<Reserva> findByUsuarioIdAndLibroId(@Param("usuarioId") Long usuarioId,
                                                @Param("libroId") Long libroId);
}