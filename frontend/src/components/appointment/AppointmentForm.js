import React, { useState } from 'react';

/**
 * Appointment form component
 * Used for creating and editing appointments
 */
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    reason: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appointment creation logic will be implemented here
    console.log('Creating appointment:', formData);
  };

  return (
    <div className="appointment-form">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={(e) => setFormData({...formData, patientId: e.target.value})}
        />
        <input
          type="text"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
        />
        <input
          type="datetime-local"
          value={formData.appointmentDateTime}
          onChange={(e) => setFormData({...formData, appointmentDateTime: e.target.value})}
        />
        <textarea
          placeholder="Reason for visit"
          value={formData.reason}
          onChange={(e) => setFormData({...formData, reason: e.target.value})}
        />
        <textarea
          placeholder="Additional notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
