package com.healthbridge.appointment.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Entity representing an appointment in the system
 */
@Entity
@Table(name = "appointments")
@Data
public class Appointment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long patientId;
    private Long doctorId;
    
    private LocalDateTime appointmentDateTime;
    private String status; // SCHEDULED, COMPLETED, CANCELLED
    private String reason;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
