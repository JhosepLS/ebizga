package org.jhosep.evaluacion.repository;

import org.jhosep.evaluacion.model.CicloEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CicloRepository extends JpaRepository<CicloEvaluacion, Long> {
    List<CicloEvaluacion> findByActivoTrue();
    List<CicloEvaluacion> findByActivoTrueOrderByFechaCreacionDesc();
}