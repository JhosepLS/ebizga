package org.jhosep.evaluacion.service;

import org.jhosep.evaluacion.dto.CicloRequest;
import org.jhosep.evaluacion.exception.BusinessException;
import org.jhosep.evaluacion.model.CicloEvaluacion;
import org.jhosep.evaluacion.repository.CicloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CicloService {

    @Autowired
    private CicloRepository cicloRepository;

    public List<CicloEvaluacion> obtenerCiclosActivos() {
        return cicloRepository.findByActivoTrueOrderByFechaCreacionDesc();
    }

    public List<CicloEvaluacion> obtenerTodosLosCiclos() {
        return cicloRepository.findAll();
    }

    public CicloEvaluacion crearCiclo(CicloRequest request) {
        CicloEvaluacion ciclo = new CicloEvaluacion();
        ciclo.setNombre(request.getNombre());
        ciclo.setDescripcion(request.getDescripcion());
        ciclo.setFechaInicio(request.getFechaInicio());
        ciclo.setFechaFin(request.getFechaFin());

        return cicloRepository.save(ciclo);
    }

    public CicloEvaluacion obtenerCicloPorId(Long id) {
        return cicloRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Ciclo de evaluación no encontrado"));
    }

    public CicloEvaluacion actualizarCiclo(Long id, CicloRequest request) {
        CicloEvaluacion ciclo = obtenerCicloPorId(id);

        ciclo.setNombre(request.getNombre());
        ciclo.setDescripcion(request.getDescripcion());
        ciclo.setFechaInicio(request.getFechaInicio());
        ciclo.setFechaFin(request.getFechaFin());

        return cicloRepository.save(ciclo);
    }

    public void desactivarCiclo(Long id) {
        CicloEvaluacion ciclo = obtenerCicloPorId(id);
        ciclo.setActivo(false);
        cicloRepository.save(ciclo);
    }
}

