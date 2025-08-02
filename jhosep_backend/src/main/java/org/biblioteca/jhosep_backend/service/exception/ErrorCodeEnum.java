package org.biblioteca.jhosep_backend.service.exception;

import lombok.Getter;

@Getter
public enum ErrorCodeEnum {
    LIBRO_NO_DISPONIBLE("L_01", "El libro no se encuentra disponible para reserva"),
    STOCK_AGOTADO("L_02", "El libro no tiene stock disponible"),
    LIBRO_YA_RESERVADO("R_01", "El usuario ya tiene una reserva activa de este libro"),
    USUARIO_NO_ENCONTRADO("U_01", "Usuario no encontrado"),
    LIBRO_NO_ENCONTRADO("L_03", "Libro no encontrado"),
    CORREO_EN_USO("U_02", "El correo ya se encuentra registrado"),
    CODIGO_LIBRO_EN_USO("L_04", "El código del libro ya se encuentra en uso");

    private String code;
    private String message;

    private ErrorCodeEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}