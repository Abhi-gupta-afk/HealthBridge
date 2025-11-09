# HealthBridge - Healthcare Management System

A full-stack healthcare management system with Spring Boot backend and React frontend. Features include appointments, patient management, secure authentication, and dashboard analytics.

## Project Structure

```
HealthBridge/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/healthbridge/
│   │   │   │   ├── HealthBridgeApplication.java
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── security/        # Security and JWT configuration
│   │   │   │   ├── exception/       # Global exception handling
│   │   │   │   ├── util/            # Utility classes
│   │   │   │   ├── auth/            # Authentication module
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   └── dto/
│   │   │   │   ├── appointment/     # Appointment module
│   │   │   │   │   ├── controller/
│   │   │   │   │   ├── service/
│   │   │   │   │   ├── repository/
│   │   │   │   │   ├── model/
│   │   │   │   │   └── dto/
│   │   │   │   └── patient/         # Patient module
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── model/
│   │   │   │       └── dto/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── static/          # Static resources
│   │   │       ├── templates/       # Email/HTML templates
│   │   │       └── db/migration/    # Database migration scripts
│   │   └── test/                    # Backend tests
│   └── pom.xml                      # Maven dependencies
│
└── frontend/                         # React Frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/                # Authentication components
    │   │   │   ├── Login.js
    │   │   │   └── Register.js
    │   │   ├── appointment/         # Appointment components
    │   │   │   ├── AppointmentList.js
    │   │   │   └── AppointmentForm.js
    │   │   ├── patient/             # Patient components
    │   │   │   └── PatientProfile.js
    │   │   ├── dashboard/           # Dashboard components
    │   │   │   └── PatientDashboard.js
    │   │   ├── common/              # Common/shared components
    │   │   │   ├── Header.js
    │   │   │   └── Footer.js
    │   │   └── layout/              # Layout components
    │   │       └── Layout.js
    │   ├── pages/                   # Page components
    │   │   ├── auth/
    │   │   ├── appointment/
    │   │   ├── patient/
    │   │   └── dashboard/
    │   ├── services/                # API services
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── appointmentService.js
    │   │   └── patientService.js
    │   ├── contexts/                # React contexts
    │   │   └── AuthContext.js
    │   ├── hooks/                   # Custom React hooks
    │   ├── utils/                   # Utility functions
    │   ├── styles/                  # CSS styles
    │   │   ├── App.css
    │   │   └── index.css
    │   ├── assets/                  # Static assets
    │   │   ├── images/
    │   │   └── icons/
    │   ├── App.js
    │   └── index.js
    └── package.json                 # NPM dependencies
```

## Features

### Backend (Spring Boot)
- **Authentication Module**: JWT-based authentication and authorization
- **Appointment Module**: Complete appointment management system
- **Patient Module**: Patient profile and dashboard management
- **Security**: Spring Security with JWT tokens
- **Database**: JPA/Hibernate with H2 (dev) and PostgreSQL (prod)
- **RESTful APIs**: Clean and well-documented REST endpoints

### Frontend (React)
- **Authentication**: Login and registration with JWT
- **Appointment Management**: Create, view, and manage appointments
- **Patient Dashboard**: Comprehensive patient information display
- **Responsive Design**: Mobile-friendly interface
- **Context API**: State management with React Context
- **Service Layer**: Axios-based API integration

## Prerequisites

### Backend
- Java 17 or higher
- Maven 3.6 or higher

### Frontend
- Node.js 16 or higher
- npm 8 or higher

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional):
```
REACT_APP_API_URL=http://localhost:8080/api
```

4. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

## Database Configuration

### Development (H2)
The application uses H2 in-memory database for development. H2 console is available at:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:healthbridge`
- Username: `sa`
- Password: (empty)

### Production (PostgreSQL)
Update `application.properties` with PostgreSQL configuration:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/healthbridge
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

## Security

The application uses JWT (JSON Web Tokens) for authentication. Update the JWT secret in production:
```properties
jwt.secret=your-secret-key-change-this-in-production-minimum-256-bits
jwt.expiration=86400000
```

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/healthbridge-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be available in the `build/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please create an issue in the GitHub repository.

## Roadmap

- [ ] Doctor management module
- [ ] Medical records management
- [ ] Prescription management
- [ ] Billing and payment integration
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile application
