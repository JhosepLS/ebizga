package org.jhosep.evaluacion.controller;

import org.jhosep.evaluacion.dto.CicloRequest;
import org.jhosep.evaluacion.service.CicloService;
import org.jhosep.evaluacion.util.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ciclos")
@CrossOrigin(origins = "http://localhost:4200")
public class CicloController {

    @Autowired
    private CicloService cicloService;

    @GetMapping
    public ResponseEntity<?> obtenerCiclos() {
        try {
            var ciclos = cicloService.obtenerTodosLosCiclos();
            return ResponseWrapper.success(ciclos, "Ciclos obtenidos").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/activos")
    public ResponseEntity<?> obtenerCiclosActivos() {
        try {
            var ciclos = cicloService.obtenerCiclosActivos();
            return ResponseWrapper.success(ciclos, "Ciclos activos obtenidos").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCiclo(@PathVariable Long id) {
        try {
            var ciclo = cicloService.obtenerCicloPorId(id);
            return ResponseWrapper.success(ciclo, "Ciclo obtenido").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PostMapping
    public ResponseEntity<?> crearCiclo(@Validated @RequestBody CicloRequest request) {
        try {
            var ciclo = cicloService.crearCiclo(request);
            return ResponseWrapper.success(ciclo, "Ciclo creado exitosamente").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCiclo(@PathVariable Long id,
                                             @Validated @RequestBody CicloRequest request) {
        try {
            var ciclo = cicloService.actualizarCiclo(id, request);
            return ResponseWrapper.success(ciclo, "Ciclo actualizado").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> desactivarCiclo(@PathVariable Long id) {
        try {
            cicloService.desactivarCiclo(id);
            return ResponseWrapper.success(null, "Ciclo desactivado").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }
}