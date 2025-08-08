package org.jhosep.evaluacion.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.jhosep.evaluacion.model.enums.RolEnum;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Enumerated(EnumType.STRING)
    private RolEnum rol;

    private String cargo;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "evaluado", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Evaluacion> evaluacionesRecibidas;

    @OneToMany(mappedBy = "evaluador", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Evaluacion> evaluacionesRealizadas;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
}