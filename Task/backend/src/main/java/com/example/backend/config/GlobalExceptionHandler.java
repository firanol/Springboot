package com.example.backend.config;

import com.example.backend.exception.TaskJobNotFoundException;
import com.example.backend.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);  // 401 Unauthorized
    }

    @ExceptionHandler(TaskJobNotFoundException.class)
    public ResponseEntity<String> handleTaskJobNotFound(TaskJobNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);  // 400 Bad Request
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);  // 500 Internal Server Error
    }
}
