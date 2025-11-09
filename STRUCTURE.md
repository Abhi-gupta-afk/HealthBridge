# HealthBridge Project Structure

This document provides a complete overview of the project folder structure.

## Overview

```
HealthBridge/
├── backend/                          # Spring Boot Backend (Java 17)
└── frontend/                         # React Frontend (React 18)
```

## Backend Structure (Spring Boot)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/healthbridge/
│   │   │   ├── HealthBridgeApplication.java      # Main Spring Boot application
│   │   │   ├── config/                           # Configuration classes
│   │   │   ├── security/                         # Security and JWT configuration
│   │   │   │   ├── SecurityConfig.java           # Spring Security configuration
│   │   │   │   └── JwtUtil.java                  # JWT utility methods
│   │   │   ├── exception/                        # Global exception handling
│   │   │   ├── util/                             # Utility classes
│   │   │   ├── controller/                       # Generic controllers
│   │   │   ├── service/                          # Generic services
│   │   │   ├── repository/                       # Generic repositories
│   │   │   ├── model/                            # Generic models
│   │   │   ├── dto/                              # Generic DTOs
│   │   │   │
│   │   │   ├── auth/                             # Authentication Module
│   │   │   │   ├── controller/
│   │   │   │   │   └── AuthController.java       # Login, logout, register endpoints
│   │   │   │   ├── service/
│   │   │   │   │   └── AuthService.java          # Authentication business logic
│   │   │   │   └── dto/
│   │   │   │       ├── LoginRequest.java         # Login request DTO
│   │   │   │       └── AuthResponse.java         # Authentication response DTO
│   │   │   │
│   │   │   ├── appointment/                      # Appointment Module
│   │   │   │   ├── controller/
│   │   │   │   │   └── AppointmentController.java # Appointment CRUD endpoints
│   │   │   │   ├── service/
│   │   │   │   │   └── AppointmentService.java   # Appointment business logic
│   │   │   │   ├── repository/
│   │   │   │   │   └── AppointmentRepository.java # JPA repository
│   │   │   │   ├── model/
│   │   │   │   │   └── Appointment.java          # Appointment entity
│   │   │   │   └── dto/
│   │   │   │       └── AppointmentDTO.java       # Appointment data transfer object
│   │   │   │
│   │   │   └── patient/                          # Patient Module
│   │   │       ├── controller/
│   │   │       │   └── PatientController.java    # Patient CRUD endpoints
│   │   │       ├── service/
│   │   │       │   └── PatientService.java       # Patient business logic
│   │   │       ├── repository/
│   │   │       │   └── PatientRepository.java    # JPA repository
│   │   │       ├── model/
│   │   │       │   └── Patient.java              # Patient entity
│   │   │       └── dto/
│   │   │           └── PatientDTO.java           # Patient data transfer object
│   │   │
│   │   └── resources/
│   │       ├── application.properties             # Spring Boot configuration
│   │       ├── static/                           # Static resources
│   │       ├── templates/                        # Email/HTML templates
│   │       └── db/
│   │           └── migration/                    # Database migration scripts
│   │
│   └── test/
│       └── java/com/healthbridge/               # Test classes
│
├── pom.xml                                      # Maven dependencies and build config
└── README.md                                    # Backend documentation
```

## Frontend Structure (React)

```
frontend/
├── public/
│   └── index.html                               # HTML template
│
├── src/
│   ├── components/                              # Reusable React components
│   │   ├── auth/                                # Authentication components
│   │   │   ├── Login.js                         # Login form component
│   │   │   └── Register.js                      # Registration form component
│   │   │
│   │   ├── appointment/                         # Appointment components
│   │   │   ├── AppointmentList.js               # List all appointments
│   │   │   └── AppointmentForm.js               # Create/edit appointment form
│   │   │
│   │   ├── patient/                             # Patient components
│   │   │   └── PatientProfile.js                # Patient profile editor
│   │   │
│   │   ├── dashboard/                           # Dashboard components
│   │   │   └── PatientDashboard.js              # Patient dashboard overview
│   │   │
│   │   ├── common/                              # Common/shared components
│   │   │   ├── Header.js                        # Navigation header
│   │   │   └── Footer.js                        # Page footer
│   │   │
│   │   └── layout/                              # Layout components
│   │       └── Layout.js                        # Main layout wrapper
│   │
│   ├── pages/                                   # Page components
│   │   ├── auth/
│   │   │   └── LoginPage.js                     # Login page
│   │   ├── appointment/
│   │   │   └── AppointmentsPage.js              # Appointments page
│   │   ├── patient/
│   │   │   └── PatientProfilePage.js            # Patient profile page
│   │   └── dashboard/
│   │       └── DashboardPage.js                 # Dashboard page
│   │
│   ├── services/                                # API service layer
│   │   ├── api.js                               # Axios configuration & interceptors
│   │   ├── authService.js                       # Authentication API calls
│   │   ├── appointmentService.js                # Appointment API calls
│   │   └── patientService.js                    # Patient API calls
│   │
│   ├── contexts/                                # React Context providers
│   │   └── AuthContext.js                       # Authentication context
│   │
│   ├── hooks/                                   # Custom React hooks
│   │
│   ├── utils/                                   # Utility functions
│   │
│   ├── styles/                                  # CSS stylesheets
│   │   ├── App.css                              # Main app styles
│   │   └── index.css                            # Global styles
│   │
│   ├── assets/                                  # Static assets
│   │   ├── images/                              # Image files
│   │   └── icons/                               # Icon files
│   │
│   ├── App.js                                   # Main App component
│   └── index.js                                 # React entry point
│
├── package.json                                 # NPM dependencies and scripts
└── README.md                                    # Frontend documentation
```

## Key Technologies

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **ORM**: Spring Data JPA / Hibernate
- **Database**: H2 (dev), PostgreSQL (prod)
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: CSS3

## Module Overview

### Authentication Module
- User login and registration
- JWT token generation and validation
- Secure password handling
- Session management

### Appointment Module
- Create, read, update, delete appointments
- Schedule management
- Appointment status tracking
- Patient-doctor linking

### Patient Module
- Patient profile management
- Medical information storage
- Patient dashboard
- Appointment history

## Design Patterns

### Backend
- **MVC Pattern**: Controller → Service → Repository
- **DTO Pattern**: Separate data transfer objects
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Spring IoC container

### Frontend
- **Component Pattern**: Reusable React components
- **Container/Presentational**: Pages vs Components
- **Service Layer**: API abstraction
- **Context Pattern**: Global state management

## Getting Started

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Documentation Files

- **SETUP.md**: Complete setup and installation guide
- **backend/README.md**: Backend-specific documentation
- **frontend/README.md**: Frontend-specific documentation
- **STRUCTURE.md**: This file - project structure overview
