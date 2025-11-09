package com.healthbridge.userService.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthbridge.userService.entity.User;
import com.healthbridge.userService.security.JwtUtil;
import com.healthbridge.userService.service.AnalyticsService;
import com.healthbridge.userService.serviceLayer.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AnalyticsService analyticsService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        String email = (String) body.get("email");
        String password = (String) body.get("password");

        Object rolesObj = body.get("roles");
        Set<String> roles;
        
        if (rolesObj instanceof String) {
            roles = Set.of((String) rolesObj);
        } else if (rolesObj instanceof List) {
            @SuppressWarnings("unchecked")
            List<String> rolesList = (List<String>) rolesObj;
            roles = rolesList.stream().collect(Collectors.toSet());
        } else {
            roles = Set.of("PATIENT");
        }

        User user = userService.registerUser(name, email, password, roles);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> userOptional = userService.getUserByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        User user = userOptional.get();
        if (!new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(email);
        
        analyticsService.logEvent("LOGIN", "User logged in: " + email, user.getId());
        
        return ResponseEntity.ok(Map.of("token", token, "userId", user.getId()));
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String email = jwtUtil.getUsernameFromToken(token);
                
                if (email != null && jwtUtil.validateToken(token)) {
                    return ResponseEntity.ok(true);
                }
            }
            return ResponseEntity.ok(false);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
