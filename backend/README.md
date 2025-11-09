# HealthBridge Backend

Spring Boot backend for HealthBridge Healthcare Management System.

## Technology Stack

- Java 17
- Spring Boot 3.1.5
- Spring Security (JWT Authentication)
- Spring Data JPA
- H2 Database (Development)
- PostgreSQL (Production)
- Maven
- Lombok

## Project Structure

```
backend/src/main/java/com/healthbridge/
├── HealthBridgeApplication.java      # Main application class
├── config/                           # Configuration classes
├── security/                         # Security and JWT configuration
│   ├── SecurityConfig.java
│   └── JwtUtil.java
├── exception/                        # Global exception handling
├── util/                            # Utility classes
├── auth/                            # Authentication module
│   ├── controller/
│   │   └── AuthController.java
│   ├── service/
│   │   └── AuthService.java
│   └── dto/
│       ├── LoginRequest.java
│       └── AuthResponse.java
├── appointment/                     # Appointment management
│   ├── controller/
│   │   └── AppointmentController.java
│   ├── service/
│   │   └── AppointmentService.java
│   ├── repository/
│   │   └── AppointmentRepository.java
│   ├── model/
│   │   └── Appointment.java
│   └── dto/
│       └── AppointmentDTO.java
└── patient/                         # Patient management
    ├── controller/
    │   └── PatientController.java
    ├── service/
    │   └── PatientService.java
    ├── repository/
    │   └── PatientRepository.java
    ├── model/
    │   └── Patient.java
    └── dto/
        └── PatientDTO.java
```

## Running the Application

### Using Maven
```bash
mvn spring-boot:run
```

### Using JAR
```bash
mvn clean package
java -jar target/healthbridge-backend-0.0.1-SNAPSHOT.jar
```

## Database Configuration

See `src/main/resources/application.properties` for database configuration.

## API Documentation

API endpoints will be documented here or using Swagger/OpenAPI.
