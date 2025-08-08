package org.jhosep.evaluacion.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "competencias")
public class Competencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ciclo_id")
    @JsonIgnoreProperties({"evaluaciones", "metas", "competencias"})
    private CicloEvaluacion ciclo;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    private Integer peso;

    @Column(name = "puntuacion_obtenida")
    private Integer puntuacionObtenida;
}