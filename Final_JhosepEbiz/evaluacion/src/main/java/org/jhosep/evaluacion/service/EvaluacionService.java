package org.jhosep.evaluacion.service;

import org.jhosep.evaluacion.dto.EvaluacionRequest;
import org.jhosep.evaluacion.exception.BusinessException;
import org.jhosep.evaluacion.model.*;
import org.jhosep.evaluacion.model.enums.EstadoEvaluacion;
import org.jhosep.evaluacion.model.enums.TipoEvaluacion;
import org.jhosep.evaluacion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CicloRepository cicloRepository;

    public List<Evaluacion> obtenerTodasLasEvaluaciones() {
        return evaluacionRepository.findAll();
    }

    public List<Evaluacion> obtenerEvaluacionesPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
        return evaluacionRepository.findByEvaluado(usuario);
    }

    public Evaluacion crearEvaluacion(EvaluacionRequest request, String emailEvaluador) {
        Usuario evaluador = usuarioRepository.findByEmail(emailEvaluador)
                .orElseThrow(() -> new BusinessException("Evaluador no encontrado"));

        Usuario evaluado = usuarioRepository.findById(request.getEvaluadoId())
                .orElseThrow(() -> new BusinessException("Empleado a evaluar no encontrado"));

        CicloEvaluacion ciclo = cicloRepository.findById(request.getCicloId())
                .orElseThrow(() -> new BusinessException("Ciclo de evaluación no encontrado"));

        Evaluacion evaluacion = new Evaluacion();
        evaluacion.setCiclo(ciclo);
        evaluacion.setEvaluado(evaluado);
        evaluacion.setEvaluador(evaluador);
        evaluacion.setTipo(TipoEvaluacion.MIXTA);

        return evaluacionRepository.save(evaluacion);
    }

    public Evaluacion completarEvaluacion(Long id, EvaluacionRequest request) {
        Evaluacion evaluacion = evaluacionRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Evaluación no encontrada"));

        evaluacion.setRetroalimentacion(request.getRetroalimentacion());
        evaluacion.setPuntuacionFinal(request.getPuntuacionFinal());
        evaluacion.setEstado(EstadoEvaluacion.COMPLETADA);
        evaluacion.setFechaCompletada(LocalDateTime.now());

        return evaluacionRepository.save(evaluacion);
    }

    public Evaluacion firmarEvaluacion(Long id, String firmaImagen) {
        Evaluacion evaluacion = evaluacionRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Evaluación no encontrada"));

        if (evaluacion.getEstado() != EstadoEvaluacion.COMPLETADA) {
            throw new BusinessException("La evaluación debe estar completada para poder firmarse");
        }

        evaluacion.setFirmaImagen(firmaImagen);
        evaluacion.setEstado(EstadoEvaluacion.FIRMADA);
        evaluacion.setFechaFirmada(LocalDateTime.now());

        return evaluacionRepository.save(evaluacion);
    }

    public Evaluacion obtenerEvaluacionPorId(Long id) {
        return evaluacionRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Evaluación no encontrada"));
    }

    public void eliminarEvaluacion(Long id) {
        if (!evaluacionRepository.existsById(id)) {
            throw new BusinessException("Evaluación no encontrada");
        }
        evaluacionRepository.deleteById(id);
    }

    public List<Evaluacion> obtenerMisEvaluaciones(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));

        List<Evaluacion> evaluacionesRecibidas = evaluacionRepository.findByEvaluado(usuario);
        List<Evaluacion> evaluacionesRealizadas = evaluacionRepository.findByEvaluador(usuario);

        // Combinar ambas listas
        Set<Evaluacion> todasMisEvaluaciones = new HashSet<>();
        todasMisEvaluaciones.addAll(evaluacionesRecibidas);
        todasMisEvaluaciones.addAll(evaluacionesRealizadas);

        return new ArrayList<>(todasMisEvaluaciones);
    }

    public List<Evaluacion> filtrarEvaluaciones(String estado, Long cicloId, Long evaluadorId, Long evaluadoId) {
        if (estado == null && cicloId == null && evaluadorId == null && evaluadoId == null) {
            return evaluacionRepository.findAll();
        }

        // Implementar filtros usando query methods o Criteria API
        List<Evaluacion> evaluaciones = evaluacionRepository.findAll();

        return evaluaciones.stream()
                .filter(e -> estado == null || e.getEstado().name().equals(estado))
                .filter(e -> cicloId == null || e.getCiclo().getId().equals(cicloId))
                .filter(e -> evaluadorId == null || e.getEvaluador().getId().equals(evaluadorId))
                .filter(e -> evaluadoId == null || e.getEvaluado().getId().equals(evaluadoId))
                .collect(Collectors.toList());
    }
}