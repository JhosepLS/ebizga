package org.jhosep.evaluacion.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "ciclos_evaluacion")
public class CicloEvaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    private boolean activo;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "ciclo", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Evaluacion> evaluaciones;

    @OneToMany(mappedBy = "ciclo", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Meta> metas;

    @OneToMany(mappedBy = "ciclo", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Competencia> competencias;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        activo = true;
    }
}