package com.healthbridge.patient.repository;

import com.healthbridge.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Patient entity
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    
    // Custom query methods will be added here
    
}
