package org.biblioteca.jhosep_backend.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Setter
public class ApiResponse<T> {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;
    private String message;
    private int status;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String errorCode;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<FieldErrorDetail> errors;

    public static <T> ApiResponse<T> success(T data, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setData(data);
        response.setMessage(message);
        response.setStatus(200);
        return response;
    }

    public static <T> ApiResponse<T> error(String message, int status) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setMessage(message);
        response.setStatus(status);
        return response;
    }

    public static <T> ApiResponse<T> error(String message, int status, String errorCode) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setMessage(message);
        response.setStatus(status);
        response.setErrorCode(errorCode);
        return response;
    }

    public static <T> ApiResponse<T> validationError(List<FieldErrorDetail> errors) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setMessage("Ocurrió un error de validación");
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setErrors(errors);
        return response;
    }

    public ResponseEntity<?> toResponseEntity() {
        return ResponseEntity.status(status).body(this);
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class FieldErrorDetail {
        private String field;
        private String code;
        private String message;
    }
}