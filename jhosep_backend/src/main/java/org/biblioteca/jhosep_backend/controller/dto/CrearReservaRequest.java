package org.biblioteca.jhosep_backend.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CrearReservaRequest {

    @NotNull(message = "El usuario es obligatorio")
    private Long usuarioId;

    @NotNull(message = "El libro es obligatorio")
    private Long libroId;

    private LocalDate fechaReserva = LocalDate.now();
}