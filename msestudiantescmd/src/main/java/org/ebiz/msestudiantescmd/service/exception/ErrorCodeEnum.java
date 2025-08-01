package org.ebiz.msestudiantescmd.service.exception;

import lombok.Getter;

@Getter
public enum ErrorCodeEnum {
    AULA_CODIGO_EN_USO("AUL_001", "El código del aula ya se encuentra en uso.");

    private String code;
    private String message;

    private ErrorCodeEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
