import React, { useState, useEffect } from 'react';

/**
 * Patient profile component
 * Displays and allows editing of patient information
 */
const PatientProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    bloodGroup: ''
  });

  useEffect(() => {
    // Fetch patient profile logic will be implemented here
    console.log('Fetching patient profile...');
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update profile logic will be implemented here
    console.log('Updating profile:', profile);
  };

  return (
    <div className="patient-profile">
      <h2>Patient Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="First Name"
          value={profile.firstName}
          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={profile.lastName}
          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({...profile, email: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) => setProfile({...profile, phone: e.target.value})}
        />
        <input
          type="date"
          value={profile.dateOfBirth}
          onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
        />
        <select
          value={profile.gender}
          onChange={(e) => setProfile({...profile, gender: e.target.value})}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Address"
          value={profile.address}
          onChange={(e) => setProfile({...profile, address: e.target.value})}
        />
        <input
          type="text"
          placeholder="Blood Group"
          value={profile.bloodGroup}
          onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default PatientProfile;
