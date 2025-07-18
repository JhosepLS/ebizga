package org.ebiz.msestudiantescmd.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class ResponseWrapper<T> {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;
    private String message;
    private int status;

    public static <T>ResponseWrapper<T> success(T data, String message) {
        ResponseWrapper<T> response = new ResponseWrapper<>();
        response.setData(data);
        response.setMessage(message);
        response.setStatus(200);
        return response;
    }

    public static <T>ResponseWrapper<T> error(String message, int status) {
        ResponseWrapper<T> response = new ResponseWrapper<>();
        response.setMessage(message);
        response.setStatus(status);
        return response;
    }

    public ResponseEntity<?> toResponseEntity() {
        return ResponseEntity.status(status).body(this);
    }
}
