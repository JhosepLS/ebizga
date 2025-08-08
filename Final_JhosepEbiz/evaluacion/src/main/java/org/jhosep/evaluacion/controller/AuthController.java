package org.jhosep.evaluacion.controller;

import org.jhosep.evaluacion.dto.LoginRequest;
import org.jhosep.evaluacion.dto.RegisterRequest;
import org.jhosep.evaluacion.service.AuthService;
import org.jhosep.evaluacion.util.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginRequest request) {
        try {
            var response = authService.login(request);
            return ResponseWrapper.success(response, "Login exitoso").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request) {
        try {
            var usuario = authService.register(request);
            return ResponseWrapper.success(usuario, "Usuario registrado exitosamente").toResponseEntity();
        } catch (Exception e) {
            return ResponseWrapper.error(e.getMessage(), 400).toResponseEntity();
        }
    }
}