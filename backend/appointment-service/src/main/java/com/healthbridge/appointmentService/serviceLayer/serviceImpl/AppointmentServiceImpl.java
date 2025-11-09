package com.healthbridge.appointmentService.serviceLayer.serviceImpl;

import com.healthbridge.appointmentService.entity.Appointment;
import com.healthbridge.appointmentService.repository.AppointmentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements com.healthbridge.appointmentService.serviceLayer.service.AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Override
    public Appointment bookAppointment(Appointment appointment) {
        appointment.setStatus("BOOKED");
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus("CANCELLED");
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Long getCount() {
        return appointmentRepository.count();
    }
}
