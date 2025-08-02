package org.biblioteca.jhosep_backend.service.impl;

import org.biblioteca.jhosep_backend.model.Usuario;
import org.biblioteca.jhosep_backend.repository.UsuarioJpaRepository;
import org.biblioteca.jhosep_backend.service.UsuarioServiceInterface;
import org.biblioteca.jhosep_backend.service.exception.BusinessException;
import org.biblioteca.jhosep_backend.service.exception.ErrorCodeEnum;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioServiceInterface {

    private final UsuarioJpaRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioJpaRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario crear(Usuario usuario) {
        Optional<Usuario> existePorCorreo = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (existePorCorreo.isPresent()) {
            throw new BusinessException(ErrorCodeEnum.CORREO_EN_USO);
        }
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCodeEnum.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuario) {
        Usuario usuarioExistente = obtenerPorId(id);

        // Verificar que el correo no este en uso
        Optional<Usuario> existePorCorreo = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (existePorCorreo.isPresent() && !existePorCorreo.get().getId().equals(id)) {
            throw new BusinessException(ErrorCodeEnum.CORREO_EN_USO);
        }

        usuarioExistente.setNombre(usuario.getNombre());
        usuarioExistente.setCorreo(usuario.getCorreo());
        return usuarioRepository.save(usuarioExistente);
    }
}