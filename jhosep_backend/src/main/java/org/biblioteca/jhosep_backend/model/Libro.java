package org.biblioteca.jhosep_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "t_libro", schema = "biblioteca")
@Setter
@Getter
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_libro")
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "codigo", unique = true)
    private String codigo;

    @Column(name = "autor")
    private String autor;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "estado")
    private String estado;

    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("libro")
    private List<Reserva> reservas;

    public boolean isDisponible() {
        return stock > 0 && "DISPONIBLE".equals(estado);
    }
}