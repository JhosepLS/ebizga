package org.jhosep.evaluacion.controller;

import org.jhosep.evaluacion.dto.CrearEvaluacionRequest;
import org.jhosep.evaluacion.dto.EvaluacionRequest;
import org.jhosep.evaluacion.service.EvaluacionService;
import org.jhosep.evaluacion.util.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/evaluaciones")
@CrossOrigin(origins = "http://localhost:4200")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    @GetMapping
    public ResponseEntity<?> obtenerEvaluaciones() {
        try {
            var evaluaciones = evaluacionService.obtenerTodasLasEvaluaciones();
            return ResponseWrapper.success(evaluaciones, "Evaluaciones obtenidas").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEvaluacion(@PathVariable Long id) {
        try {
            var evaluacion = evaluacionService.obtenerEvaluacionPorId(id);
            return ResponseWrapper.success(evaluacion, "Evaluación obtenida").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PostMapping
    public ResponseEntity<?> crearEvaluacion(@Validated @RequestBody CrearEvaluacionRequest request,
                                             Authentication auth) {
        try {
            // Convertir a EvaluacionRequest
            EvaluacionRequest evaluacionRequest = new EvaluacionRequest();
            evaluacionRequest.setCicloId(request.getCicloId());
            evaluacionRequest.setEvaluadoId(request.getEvaluadoId());

            var evaluacion = evaluacionService.crearEvaluacion(evaluacionRequest, auth.getName());
            return ResponseWrapper.success(evaluacion, "Evaluación creada exitosamente").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PutMapping("/{id}/completar")
    public ResponseEntity<?> completarEvaluacion(@PathVariable Long id,
                                                 @RequestBody EvaluacionRequest request) {
        try {
            var evaluacion = evaluacionService.completarEvaluacion(id, request);
            return ResponseWrapper.success(evaluacion, "Evaluación completada").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PutMapping("/{id}/firmar")
    public ResponseEntity<?> firmarEvaluacion(@PathVariable Long id,
                                              @RequestBody Map<String, String> request) {
        try {
            String firmaImagen = request.get("firmaImagen");

            if (firmaImagen == null || firmaImagen.trim().isEmpty()) {
                return ResponseWrapper.error("La firma es obligatoria", 400).toResponseEntity();
            }

            var evaluacion = evaluacionService.firmarEvaluacion(id, firmaImagen);
            return ResponseWrapper.success(evaluacion, "Evaluación firmada exitosamente").toResponseEntity();
        } catch (Exception e) {
            System.err.println("Error al firmar evaluación: " + e.getMessage());
            e.printStackTrace();
            return ResponseWrapper.error("Error al firmar la evaluación: " + e.getMessage(), 400).toResponseEntity();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEvaluacion(@PathVariable Long id) {
        try {
            evaluacionService.eliminarEvaluacion(id);
            return ResponseWrapper.success(null, "Evaluación eliminada").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obtenerEvaluacionesPorUsuario(@PathVariable Long usuarioId) {
        try {
            var evaluaciones = evaluacionService.obtenerEvaluacionesPorUsuario(usuarioId);
            return ResponseWrapper.success(evaluaciones, "Evaluaciones del usuario obtenidas").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/mis-evaluaciones")
    public ResponseEntity<?> obtenerMisEvaluaciones(Authentication auth) {
        try {
            var evaluaciones = evaluacionService.obtenerMisEvaluaciones(auth.getName());
            return ResponseWrapper.success(evaluaciones, "Mis evaluaciones obtenidas").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/filtrar")
    public ResponseEntity<?> filtrarEvaluaciones(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) Long cicloId,
            @RequestParam(required = false) Long evaluadorId,
            @RequestParam(required = false) Long evaluadoId) {
        try {
            var evaluaciones = evaluacionService.filtrarEvaluaciones(estado, cicloId, evaluadorId, evaluadoId);
            return ResponseWrapper.success(evaluaciones, "Evaluaciones filtradas").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }
}