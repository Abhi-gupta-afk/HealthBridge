package com.healthbridge.userService.controller;

import com.healthbridge.userService.dto.AnalyticsDTO;
import com.healthbridge.userService.entity.User;
import com.healthbridge.userService.service.AnalyticsService;
import com.healthbridge.userService.serviceLayer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final AnalyticsService analyticsService;
    private final RestTemplate restTemplate;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/appointments")
    @PreAuthorize("hasRole('ADMIN')")
    public Object getAllAppointments() {
        try {
            return restTemplate.getForObject("http://appointmentService/api/appointments/all", Object.class);
        } catch (Exception e) {
            return Map.of("error", "Unable to fetch appointments");
        }
    }

    @GetMapping("/payments")
    @PreAuthorize("hasRole('ADMIN')")
    public Object getAllPayments() {
        try {
            return restTemplate.getForObject("http://paymentService/api/payments/all", Object.class);
        } catch (Exception e) {
            return Map.of("error", "Unable to fetch payments");
        }
    }

    @GetMapping("/reports")
    @PreAuthorize("hasRole('ADMIN')")
    public Object getAllReports() {
        try {
            return restTemplate.getForObject("http://reportService/api/reports/all", Object.class);
        } catch (Exception e) {
            return Map.of("error", "Unable to fetch reports");
        }
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public AnalyticsDTO getAnalytics() {
        return analyticsService.getSystemAnalytics();
    }
}
