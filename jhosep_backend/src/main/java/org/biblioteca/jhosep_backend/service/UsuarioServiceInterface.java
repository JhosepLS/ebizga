package org.biblioteca.jhosep_backend.service;

import org.biblioteca.jhosep_backend.model.Usuario;

import java.util.List;

public interface UsuarioServiceInterface {
    Usuario crear(Usuario usuario);
    List<Usuario> listar();
    Usuario obtenerPorId(Long id);
    Usuario actualizar(Long id, Usuario usuario);
}