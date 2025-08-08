package org.jhosep.evaluacion.repository;

import org.jhosep.evaluacion.model.Meta;
import org.jhosep.evaluacion.model.CicloEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MetaRepository extends JpaRepository<Meta, Long> {
    List<Meta> findByCiclo(CicloEvaluacion ciclo);
}