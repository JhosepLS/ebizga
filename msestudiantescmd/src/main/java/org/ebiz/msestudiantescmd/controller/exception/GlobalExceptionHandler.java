package org.ebiz.msestudiantescmd.controller.exception;

import org.ebiz.msestudiantescmd.controller.ResponseWrapper;
import org.ebiz.msestudiantescmd.service.exception.BusinessException;
import org.ebiz.msestudiantescmd.service.exception.ErrorCodeEnum;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.View;

import java.util.List;

@RestControllerAdvice(
        basePackages = "org.ebiz.msestudiantescmd.controller"
)
public class GlobalExceptionHandler {

    private final View error;

    public GlobalExceptionHandler(View error) {
        this.error = error;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(
            MethodArgumentNotValidException exception
    ) {
        List<ResponseWrapper.FieldErrorDetail> errors = exception.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> {
                    String message = fieldError.getDefaultMessage();
                    String field = fieldError.getField();
                    String code = "VALIDATION_ERROR";
                    ResponseWrapper.FieldErrorDetail fieldErrorDetail = new ResponseWrapper.FieldErrorDetail(
                            field,
                            code,
                            message
                    );
                    return   fieldErrorDetail;
                }).toList();
        return ResponseWrapper
                .validationError(errors)
                .toResponseEntity();
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusinessException(
            BusinessException exception
    ) {
        ErrorCodeEnum errorCode = exception.getErrorCode();
        return ResponseWrapper.error(
                errorCode.getMessage(),
                HttpStatus.CONFLICT.value(),
                errorCode.getCode()
        ).toResponseEntity();
    }
}