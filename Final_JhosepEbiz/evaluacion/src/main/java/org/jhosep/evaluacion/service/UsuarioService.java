package org.jhosep.evaluacion.service;

import org.jhosep.evaluacion.exception.BusinessException;
import org.jhosep.evaluacion.model.Usuario;
import org.jhosep.evaluacion.model.enums.RolEnum;
import org.jhosep.evaluacion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
    }

    public Usuario obtenerUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Usuario no encontrado"));
    }

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        Usuario usuario = obtenerUsuarioPorId(id);

        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuario.setCargo(usuarioActualizado.getCargo());
        usuario.setRol(usuarioActualizado.getRol());

        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new BusinessException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }
}