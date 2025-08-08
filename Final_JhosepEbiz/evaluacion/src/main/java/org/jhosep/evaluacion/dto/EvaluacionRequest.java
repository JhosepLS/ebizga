package org.jhosep.evaluacion.dto;

import jakarta.validation.constraints.NotNull;

public class EvaluacionRequest {
    // Para crear evaluación
    private Long cicloId;
    private Long evaluadoId;

    // Para completar evaluación (estos NO deben ser obligatorios)
    private String retroalimentacion;
    private Double puntuacionFinal;
    private String firmaImagen;

    // Constructors
    public EvaluacionRequest() {}

    // Getters and Setters
    public Long getCicloId() { return cicloId; }
    public void setCicloId(Long cicloId) { this.cicloId = cicloId; }

    public Long getEvaluadoId() { return evaluadoId; }
    public void setEvaluadoId(Long evaluadoId) { this.evaluadoId = evaluadoId; }

    public String getRetroalimentacion() { return retroalimentacion; }
    public void setRetroalimentacion(String retroalimentacion) { this.retroalimentacion = retroalimentacion; }

    public Double getPuntuacionFinal() { return puntuacionFinal; }
    public void setPuntuacionFinal(Double puntuacionFinal) { this.puntuacionFinal = puntuacionFinal; }

    public String getFirmaImagen() { return firmaImagen; }
    public void setFirmaImagen(String firmaImagen) { this.firmaImagen = firmaImagen; }
}