import React from 'react';
import AppointmentList from '../../components/appointment/AppointmentList';
import AppointmentForm from '../../components/appointment/AppointmentForm';

/**
 * Appointments page
 * Displays appointment list and form
 */
const AppointmentsPage = () => {
  return (
    <div className="appointments-page">
      <h1>Appointments</h1>
      <div className="appointments-content">
        <AppointmentForm />
        <AppointmentList />
      </div>
    </div>
  );
};

export default AppointmentsPage;
