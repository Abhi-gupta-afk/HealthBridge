package com.healthbridge.patient.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity representing a patient in the system
 */
@Entity
@Table(name = "patients")
@Data
public class Patient {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String bloodGroup;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
