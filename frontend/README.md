# HealthBridge Frontend

React frontend for HealthBridge Healthcare Management System.

## Technology Stack

- React 18
- React Router DOM
- Axios
- React Context API
- CSS3

## Project Structure

```
frontend/src/
├── components/                      # React components
│   ├── auth/                       # Authentication components
│   │   ├── Login.js
│   │   └── Register.js
│   ├── appointment/                # Appointment components
│   │   ├── AppointmentList.js
│   │   └── AppointmentForm.js
│   ├── patient/                    # Patient components
│   │   └── PatientProfile.js
│   ├── dashboard/                  # Dashboard components
│   │   └── PatientDashboard.js
│   ├── common/                     # Common components
│   │   ├── Header.js
│   │   └── Footer.js
│   └── layout/                     # Layout components
│       └── Layout.js
├── pages/                          # Page components
│   ├── auth/
│   │   └── LoginPage.js
│   ├── appointment/
│   │   └── AppointmentsPage.js
│   ├── patient/
│   │   └── PatientProfilePage.js
│   └── dashboard/
│       └── DashboardPage.js
├── services/                       # API services
│   ├── api.js
│   ├── authService.js
│   ├── appointmentService.js
│   └── patientService.js
├── contexts/                       # React contexts
│   └── AuthContext.js
├── hooks/                          # Custom React hooks
├── utils/                          # Utility functions
├── styles/                         # CSS styles
│   ├── App.css
│   └── index.css
├── assets/                         # Static assets
│   ├── images/
│   └── icons/
├── App.js
└── index.js
```

## Running the Application

### Development
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8080/api
```

## Features

- User authentication (login/register)
- Appointment management
- Patient dashboard
- Patient profile management
- Responsive design
- Protected routes
- JWT token management
