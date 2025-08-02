package org.biblioteca.jhosep_backend.controller.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CrearLibroRequest {

    @NotBlank(message = "El título no puede estar vacío")
    @Size(min = 3, max = 200, message = "El título debe tener entre 3 y 200 caracteres")
    private String titulo;

    @NotBlank(message = "El código no puede estar vacío")
    @Size(min = 3, max = 20, message = "El código debe tener entre 3 y 20 caracteres")
    private String codigo;

    @NotBlank(message = "El autor no puede estar vacío")
    @Size(min = 3, max = 100, message = "El autor debe tener entre 3 y 100 caracteres")
    private String autor;

    @NotNull(message = "El stock no puede estar vacío")
    @Min(value = 1, message = "El stock debe ser mayor a 0")
    private Integer stock;
}