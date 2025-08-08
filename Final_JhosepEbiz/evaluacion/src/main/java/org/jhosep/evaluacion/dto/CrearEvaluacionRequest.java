package org.jhosep.evaluacion.dto;

import jakarta.validation.constraints.NotNull;

public class CrearEvaluacionRequest {
    @NotNull(message = "El ID del ciclo es obligatorio")
    private Long cicloId;

    @NotNull(message = "El ID del evaluado es obligatorio")
    private Long evaluadoId;

    // Getters and Setters
    public Long getCicloId() { return cicloId; }
    public void setCicloId(Long cicloId) { this.cicloId = cicloId; }

    public Long getEvaluadoId() { return evaluadoId; }
    public void setEvaluadoId(Long evaluadoId) { this.evaluadoId = evaluadoId; }
}