package org.jhosep.evaluacion.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.jhosep.evaluacion.model.enums.EstadoEvaluacion;
import org.jhosep.evaluacion.model.enums.TipoEvaluacion;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "evaluaciones")
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ciclo_id")
    @JsonIgnoreProperties({"evaluaciones", "metas", "competencias"})
    private CicloEvaluacion ciclo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "evaluado_id")
    @JsonIgnoreProperties({"evaluacionesRecibidas", "evaluacionesRealizadas", "password"})
    private Usuario evaluado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "evaluador_id")
    @JsonIgnoreProperties({"evaluacionesRecibidas", "evaluacionesRealizadas", "password"})
    private Usuario evaluador;

    @Enumerated(EnumType.STRING)
    private TipoEvaluacion tipo;

    @Enumerated(EnumType.STRING)
    private EstadoEvaluacion estado;

    @Column(name = "puntuacion_final")
    private Double puntuacionFinal;

    @Column(columnDefinition = "TEXT")
    private String retroalimentacion;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_completada")
    private LocalDateTime fechaCompletada;

    @Column(name = "fecha_firmada")
    private LocalDateTime fechaFirmada;

    @Column(name = "firma_imagen", columnDefinition = "LONGTEXT")
    private String firmaImagen;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        estado = EstadoEvaluacion.PENDIENTE;
    }
}