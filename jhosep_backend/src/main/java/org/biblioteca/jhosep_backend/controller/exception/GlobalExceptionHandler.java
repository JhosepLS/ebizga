package org.biblioteca.jhosep_backend.controller.exception;

import org.biblioteca.jhosep_backend.controller.ApiResponse;
import org.biblioteca.jhosep_backend.service.exception.BusinessException;
import org.biblioteca.jhosep_backend.service.exception.ErrorCodeEnum;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice(basePackages = "org.biblioteca.jhosep_backend.controller")
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(
            MethodArgumentNotValidException exception
    ) {
        List<ApiResponse.FieldErrorDetail> errors = exception.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> {
                    String message = fieldError.getDefaultMessage();
                    String field = fieldError.getField();
                    String code = "VALIDATION_ERROR";
                    return new ApiResponse.FieldErrorDetail(field, code, message);
                }).toList();

        return ApiResponse.validationError(errors).toResponseEntity();
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusinessException(BusinessException exception) {
        ErrorCodeEnum errorCode = exception.getErrorCode();
        return ApiResponse.error(
                errorCode.getMessage(),
                HttpStatus.CONFLICT.value(),
                errorCode.getCode()
        ).toResponseEntity();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception exception) {
        return ApiResponse.error(
                "Error interno del servidor",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
        ).toResponseEntity();
    }
}