package com.example.backend.exception;

public class TaskJobNotFoundException extends RuntimeException {
    public TaskJobNotFoundException(String message) {
        super(message);
    }
}
