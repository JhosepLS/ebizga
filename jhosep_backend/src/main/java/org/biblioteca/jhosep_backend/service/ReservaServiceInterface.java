package org.biblioteca.jhosep_backend.service;

import org.biblioteca.jhosep_backend.model.Reserva;

import java.util.List;

public interface ReservaServiceInterface {
    Reserva crear(Long usuarioId, Long libroId);
    List<Reserva> obtenerReservasPorUsuario(Long usuarioId);
}