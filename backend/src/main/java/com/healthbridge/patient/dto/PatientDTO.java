package com.healthbridge.patient.dto;

import lombok.Data;
import java.time.LocalDate;

/**
 * DTO for patient data transfer
 */
@Data
public class PatientDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String bloodGroup;
}
