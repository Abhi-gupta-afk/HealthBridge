package com.healthbridge.appointment.dto;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * DTO for appointment data transfer
 */
@Data
public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDateTime;
    private String status;
    private String reason;
    private String notes;
}
