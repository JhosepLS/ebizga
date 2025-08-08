package org.jhosep.evaluacion.repository;

import org.jhosep.evaluacion.model.Competencia;
import org.jhosep.evaluacion.model.CicloEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompetenciaRepository extends JpaRepository<Competencia, Long> {
    List<Competencia> findByCiclo(CicloEvaluacion ciclo);
}