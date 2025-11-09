package com.healthbridge.userService.config;

import com.healthbridge.userService.entity.Role;
import com.healthbridge.userService.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            Role patientRole = new Role();
            patientRole.setName("PATIENT");
            roleRepository.save(patientRole);

            Role doctorRole = new Role();
            doctorRole.setName("DOCTOR");
            roleRepository.save(doctorRole);

            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            roleRepository.save(adminRole);

            log.info("✅ Roles initialized: PATIENT, DOCTOR, ADMIN");
        }
    }
}
