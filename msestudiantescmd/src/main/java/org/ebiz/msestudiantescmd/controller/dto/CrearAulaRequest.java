package org.ebiz.msestudiantescmd.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrearAulaRequest {
    @NotBlank(message = "El nombre del aula no puede estar vacío")
    private String nombre;
    @NotBlank(message = "El código del aula no puede estar vacío")
    private String codigo;
}
