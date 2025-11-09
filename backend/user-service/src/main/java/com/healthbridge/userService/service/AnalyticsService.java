package com.healthbridge.userService.service;

import com.healthbridge.userService.dto.AnalyticsDTO;
import com.healthbridge.userService.entity.SystemLog;
import com.healthbridge.userService.repository.SystemLogRepository;
import com.healthbridge.userService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final SystemLogRepository systemLogRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public void logEvent(String eventType, String description, Long userId) {
        SystemLog log = new SystemLog(eventType, description, userId);
        systemLogRepository.save(log);
    }

    public AnalyticsDTO getSystemAnalytics() {
        long totalUsers = userRepository.count();
        long totalLogins = systemLogRepository.countByEventType("LOGIN");
        
        long totalAppointments = 0;
        long totalPayments = 0;
        
        try {
            Integer appointments = restTemplate.getForObject("http://appointmentService/api/appointments/count", Integer.class);
            totalAppointments = appointments != null ? appointments : 0;
        } catch (Exception ignored) {}
        
        try {
            Integer payments = restTemplate.getForObject("http://paymentService/api/payments/count", Integer.class);
            totalPayments = payments != null ? payments : 0;
        } catch (Exception ignored) {}

        return new AnalyticsDTO(totalUsers, totalLogins, totalAppointments, totalPayments);
    }
}
