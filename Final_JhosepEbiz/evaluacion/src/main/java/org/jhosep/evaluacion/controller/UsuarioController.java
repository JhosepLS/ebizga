// UsuarioController.java
package org.jhosep.evaluacion.controller;

import org.jhosep.evaluacion.service.UsuarioService;
import org.jhosep.evaluacion.util.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<?> obtenerUsuarios() {
        try {
            var usuarios = usuarioService.obtenerTodosLosUsuarios();
            return ResponseWrapper.success(usuarios, "Usuarios obtenidos").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuario(@PathVariable Long id) {
        try {
            var usuario = usuarioService.obtenerUsuarioPorId(id);
            return ResponseWrapper.success(usuario, "Usuario obtenido").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            usuarioService.eliminarUsuario(id);
            return ResponseWrapper.success(null, "Usuario eliminado").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }
}