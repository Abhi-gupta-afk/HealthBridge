package com.healthbridge.auth.dto;

import lombok.Data;

/**
 * DTO for user login request
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}
