package com.healthbridge.userService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDTO {
    private long totalUsers;
    private long totalLogins;
    private long totalAppointments;
    private long totalPayments;
}
