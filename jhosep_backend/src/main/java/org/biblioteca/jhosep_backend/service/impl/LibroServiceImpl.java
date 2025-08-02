package org.biblioteca.jhosep_backend.service.impl;

import org.biblioteca.jhosep_backend.model.Libro;
import org.biblioteca.jhosep_backend.repository.LibroJpaRepository;
import org.biblioteca.jhosep_backend.service.LibroServiceInterface;
import org.biblioteca.jhosep_backend.service.exception.BusinessException;
import org.biblioteca.jhosep_backend.service.exception.ErrorCodeEnum;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibroServiceImpl implements LibroServiceInterface {

    private final LibroJpaRepository libroRepository;

    public LibroServiceImpl(LibroJpaRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    @Override
    public Libro crear(Libro libro) {
        Optional<Libro> existePorCodigo = libroRepository.findByCodigo(libro.getCodigo());
        if (existePorCodigo.isPresent()) {
            throw new BusinessException(ErrorCodeEnum.CODIGO_LIBRO_EN_USO);
        }

        libro.setEstado("DISPONIBLE");
        return libroRepository.save(libro);
    }

    @Override
    public List<Libro> listar() {
        return libroRepository.findAll();
    }

    @Override
    public List<Libro> listarDisponibles() {
        return libroRepository.findAllDisponibles();
    }

    @Override
    public Libro obtenerPorId(Long id) {
        return libroRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCodeEnum.LIBRO_NO_ENCONTRADO));
    }

    @Override
    public List<Libro> buscarPorTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);
    }
}