package org.jhosep.evaluacion.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.http.ResponseEntity;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseWrapper<T> {
    private T data;
    private String message;
    private int status;
    private String errorCode;

    public static <T> ResponseWrapper<T> success(T data, String message) {
        ResponseWrapper<T> response = new ResponseWrapper<>();
        response.setData(data);
        response.setMessage(message);
        response.setStatus(200);
        return response;
    }

    public static <T> ResponseWrapper<T> error(String message, int status) {
        ResponseWrapper<T> response = new ResponseWrapper<>();
        response.setMessage(message);
        response.setStatus(status);
        return response;
    }

    public ResponseEntity<?> toResponseEntity() {
        return ResponseEntity.status(status).body(this);
    }

    // Getters and Setters
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
    public String getErrorCode() { return errorCode; }
    public void setErrorCode(String errorCode) { this.errorCode = errorCode; }
}