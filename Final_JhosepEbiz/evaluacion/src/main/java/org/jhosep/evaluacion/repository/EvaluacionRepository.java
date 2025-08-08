package org.jhosep.evaluacion.repository;

import org.jhosep.evaluacion.model.Evaluacion;
import org.jhosep.evaluacion.model.Usuario;
import org.jhosep.evaluacion.model.CicloEvaluacion;
import org.jhosep.evaluacion.model.enums.EstadoEvaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EvaluacionRepository extends JpaRepository<Evaluacion, Long> {
    List<Evaluacion> findByEvaluado(Usuario evaluado);
    List<Evaluacion> findByEvaluador(Usuario evaluador);
    List<Evaluacion> findByCiclo(CicloEvaluacion ciclo);
    List<Evaluacion> findByEstado(EstadoEvaluacion estado);
    List<Evaluacion> findByEvaluadoAndCiclo(Usuario evaluado, CicloEvaluacion ciclo);
}