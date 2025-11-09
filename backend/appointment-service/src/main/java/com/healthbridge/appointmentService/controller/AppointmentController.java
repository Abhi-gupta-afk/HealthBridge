package com.healthbridge.appointmentService.controller;

import com.healthbridge.appointmentService.entity.Appointment;
import com.healthbridge.appointmentService.serviceLayer.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(appointmentService.bookAppointment(appointment));
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id));
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(id));
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.ok(appointmentService.getCount());
    }
}
