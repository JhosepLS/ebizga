package org.ebiz.msestudiantescmd.controller;

import lombok.extern.slf4j.Slf4j;
import org.ebiz.msestudiantescmd.controller.dto.CrearAulaRequest;
import org.ebiz.msestudiantescmd.model.Aula;
import org.ebiz.msestudiantescmd.model.Estudiante;
import org.ebiz.msestudiantescmd.service.EstudianteServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@Slf4j
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    private final EstudianteServiceInterface estudianteService;

    public EstudianteController(EstudianteServiceInterface estudianteService) {
        this.estudianteService = estudianteService;
    }

    @PostMapping
    public ResponseEntity<?> guardar(
            @RequestBody Estudiante estudiante
    ) {
        try {
            Estudiante guardado = estudianteService.guardar(estudiante);
            return ResponseWrapper.success(guardado, "Estudiante guardado exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseWrapper.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }

    @GetMapping
    public List<Estudiante> listar() {
        return estudianteService.listar();
    }

    @GetMapping("/{id}")
    public Estudiante obtenerPorId(
            @PathVariable Long id
    ) {
        try {
            return estudianteService.obtenerPorId(id);
        } catch (Exception e) {
            return null;
        }
    }

    @PutMapping("/{id}")
    public Estudiante actualizar(
            @PathVariable Long id,
            @RequestBody Estudiante estudiante
    ) {
        return estudianteService.actualizar(id, estudiante);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Long id
    ) {
        estudianteService.eliminar(id);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Void> cambiarEstado(
            @PathVariable Long id,
            @RequestParam boolean habilitado
    ) {
        estudianteService.cambiarEstado(id, habilitado);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/aulas")
    public ResponseEntity<?> guardarAula(
            @Validated @RequestBody CrearAulaRequest request
    ) {
            Aula aulaParaGuardar = new Aula();
            aulaParaGuardar.setNombre(request.getNombre());
            aulaParaGuardar.setCodigo(request.getCodigo());
            Aula guardado = estudianteService.guardarAula(aulaParaGuardar);
            return ResponseWrapper.success(guardado, "Aula guardado exitosamente").toResponseEntity();
    }

    @PostMapping("aulas/{idAula}/estudiantes/{idEstudiante}")
    public  ResponseEntity<?> asignarEstudianteAula(
            @PathVariable Long idAula,
            @PathVariable Long idEstudiante
    ) {
        try {
            Aula aulaActualizada = estudianteService.agregarEstudianteAula(idAula, idEstudiante);
            return ResponseWrapper.success(aulaActualizada, "Estudiante asignado a aula exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseWrapper.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }

    @GetMapping("/aulas")
    public List<Aula> listarAulas() {
        return estudianteService.listarAulas();
    }
}
