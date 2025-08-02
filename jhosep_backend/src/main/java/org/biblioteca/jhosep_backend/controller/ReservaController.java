package org.biblioteca.jhosep_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.biblioteca.jhosep_backend.controller.dto.CrearReservaRequest;
import org.biblioteca.jhosep_backend.model.Reserva;
import org.biblioteca.jhosep_backend.service.ReservaServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaServiceInterface reservaService;

    public ReservaController(ReservaServiceInterface reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public ResponseEntity<?> crear(@Validated @RequestBody CrearReservaRequest request) {
        try {
            Reserva reserva = reservaService.crear(request.getUsuarioId(), request.getLibroId());
            return ApiResponse.success(reserva, "Reserva creada exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> obtenerReservasPorUsuario(@PathVariable Long id) {
        try {
            List<Reserva> reservas = reservaService.obtenerReservasPorUsuario(id);
            return ApiResponse.success(reservas, "Reservas obtenidas exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.NOT_FOUND.value()).toResponseEntity();
        }
    }
}