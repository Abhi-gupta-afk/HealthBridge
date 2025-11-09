import React, { useState, useEffect } from 'react';

/**
 * Appointment list component
 * Displays all appointments
 */
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments logic will be implemented here
    console.log('Fetching appointments...');
  }, []);

  return (
    <div className="appointment-list">
      <h2>Appointments</h2>
      <div className="appointments-container">
        {appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>{appointment.reason}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
