package org.biblioteca.jhosep_backend.service.impl;

import org.biblioteca.jhosep_backend.model.Libro;
import org.biblioteca.jhosep_backend.model.Reserva;
import org.biblioteca.jhosep_backend.model.Usuario;
import org.biblioteca.jhosep_backend.repository.LibroJpaRepository;
import org.biblioteca.jhosep_backend.repository.ReservaJpaRepository;
import org.biblioteca.jhosep_backend.repository.UsuarioJpaRepository;
import org.biblioteca.jhosep_backend.service.ReservaServiceInterface;
import org.biblioteca.jhosep_backend.service.exception.BusinessException;
import org.biblioteca.jhosep_backend.service.exception.ErrorCodeEnum;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements ReservaServiceInterface {

    private final ReservaJpaRepository reservaRepository;
    private final UsuarioJpaRepository usuarioRepository;
    private final LibroJpaRepository libroRepository;

    public ReservaServiceImpl(ReservaJpaRepository reservaRepository,
                              UsuarioJpaRepository usuarioRepository,
                              LibroJpaRepository libroRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
    }

    @Override
    @Transactional
    public Reserva crear(Long usuarioId, Long libroId) {
        // Verificar que usuario existe
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new BusinessException(ErrorCodeEnum.USUARIO_NO_ENCONTRADO));

        // Verificar que libro existe
        Libro libro = libroRepository.findById(libroId)
                .orElseThrow(() -> new BusinessException(ErrorCodeEnum.LIBRO_NO_ENCONTRADO));

        // Verificar que libro esta disponible
        if (!libro.isDisponible()) {
            throw new BusinessException(ErrorCodeEnum.LIBRO_NO_DISPONIBLE);
        }

        // Verificar que no este agotacdo
        if (libro.getStock() <= 0) {
            throw new BusinessException(ErrorCodeEnum.STOCK_AGOTADO);
        }

        // Verificar que usuario ya reservo el libro
        Optional<Reserva> reservaExistente = reservaRepository.findByUsuarioIdAndLibroId(usuarioId, libroId);
        if (reservaExistente.isPresent()) {
            throw new BusinessException(ErrorCodeEnum.LIBRO_YA_RESERVADO);
        }

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setLibro(libro);
        reserva.setFechaReserva(LocalDate.now());

        libro.setStock(libro.getStock() - 1);

        if (libro.getStock() == 0) {
            libro.setEstado("AGOTADO");
        }

        libroRepository.save(libro);
        return reservaRepository.save(reserva);
    }

    @Override
    public List<Reserva> obtenerReservasPorUsuario(Long usuarioId) {
        usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new BusinessException(ErrorCodeEnum.USUARIO_NO_ENCONTRADO));

        return reservaRepository.findByUsuarioId(usuarioId);
    }
}