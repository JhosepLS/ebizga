package org.jhosep.evaluacion.service;

import org.jhosep.evaluacion.dto.LoginRequest;
import org.jhosep.evaluacion.dto.RegisterRequest;
import org.jhosep.evaluacion.exception.BusinessException;
import org.jhosep.evaluacion.model.Usuario;
import org.jhosep.evaluacion.repository.UsuarioRepository;
import org.jhosep.evaluacion.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BusinessException("Credenciales inválidas");
        }

        String token = jwtUtil.generateToken(usuario.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", usuario);

        return response;
    }

    public Usuario register(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setRol(request.getRol());
        usuario.setCargo(request.getCargo());

        return usuarioRepository.save(usuario);
    }
}