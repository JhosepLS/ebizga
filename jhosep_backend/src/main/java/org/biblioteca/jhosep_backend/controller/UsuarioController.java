package org.biblioteca.jhosep_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.biblioteca.jhosep_backend.controller.dto.CrearUsuarioRequest;
import org.biblioteca.jhosep_backend.model.Usuario;
import org.biblioteca.jhosep_backend.service.UsuarioServiceInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioServiceInterface usuarioService;

    public UsuarioController(UsuarioServiceInterface usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<?> crear(@Validated @RequestBody CrearUsuarioRequest request) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNombre(request.getNombre());
            usuario.setCorreo(request.getCorreo());

            Usuario guardado = usuarioService.crear(usuario);
            return ApiResponse.success(guardado, "Usuario creado exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        List<Usuario> usuarios = usuarioService.listar();
        return ApiResponse.success(usuarios, "Usuarios obtenidos exitosamente").toResponseEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.obtenerPorId(id);
            return ApiResponse.success(usuario, "Usuario encontrado").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.NOT_FOUND.value()).toResponseEntity();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Validated @RequestBody CrearUsuarioRequest request) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNombre(request.getNombre());
            usuario.setCorreo(request.getCorreo());

            Usuario actualizado = usuarioService.actualizar(id, usuario);
            return ApiResponse.success(actualizado, "Usuario actualizado exitosamente").toResponseEntity();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()).toResponseEntity();
        }
    }
}