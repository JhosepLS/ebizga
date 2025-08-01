package org.ebiz.msestudiantescmd.repository;

import org.ebiz.msestudiantescmd.model.Aula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AulaJpaRepository extends JpaRepository<Aula, Long> {
    Optional<Aula> findByCodigo(String codigo);
}
