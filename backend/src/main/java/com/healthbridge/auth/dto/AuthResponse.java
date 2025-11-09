package com.healthbridge.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for authentication response with JWT token
 */
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    
    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }
}
