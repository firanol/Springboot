package com.example.backend.dto;

public class RegisterResponse {
    public RegisterResponse(long id, String username) {
        this.id = id;
        this.username = username;
    }
    public long id;
    public String username;
}
