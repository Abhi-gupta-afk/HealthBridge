package com.healthbridge.appointmentService.serviceLayer.service;

import com.healthbridge.appointmentService.entity.Appointment;
import java.util.List;

public interface AppointmentService {
	Appointment bookAppointment(Appointment appointment);
    Appointment cancelAppointment(Long id);
    List<Appointment> getAppointmentsByPatient(Long patientId);
    List<Appointment> getAppointmentsByDoctor(Long doctorId);
    List<Appointment> getAllAppointments();
    Long getCount();
}