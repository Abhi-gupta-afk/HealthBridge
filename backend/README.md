# 🏥 HealthBridge Backend - Microservices Architecture# 🏥 HealthBridge Microservices Platform



## OverviewA complete microservices-based healthcare management system built with Spring Boot 3.3.0, Spring Cloud 2023.0.1, and Java 17.

HealthBridge is a comprehensive healthcare management system built with Spring Boot microservices architecture.

## 📋 Architecture Overview

## Services

```

| Service | Port | Description |┌─────────────────────────────────────────────────────────────┐

|---------|------|-------------|│                    Eureka Server (8761)                      │

| **Eureka Server** | 8761 | Service Discovery |│                  Service Discovery & Registry                │

| **Gateway Service** | 8080 | API Gateway + JWT Auth |└─────────────────────────────────────────────────────────────┘

| **User Service** | 8081 | User Management & Auth |                              │

| **Appointment Service** | 8082 | Appointment Booking |                              ▼

| **Notification Service** | 8083 | Email Notifications |┌─────────────────────────────────────────────────────────────┐

| **Report Service** | 8084 | File Upload & Reports |│                   Gateway Service (8080)                     │

| **Payment Service** | 8085 | Payment Processing |│                      API Gateway Layer                       │

└─────────────────────────────────────────────────────────────┘

## Technology Stack         │           │           │           │           │

    ┌────┴────┬──────┴─────┬────┴────┬──────┴──────┬────┴────┐

- Spring Boot 3.3.0    ▼         ▼            ▼         ▼             ▼         ▼

- Spring Cloud 2023.0.1┌────────┐ ┌──────────┐ ┌────────┐ ┌─────────┐ ┌─────────┐

- Java 17│ User   │ │Appointmt │ │Notific │ │ Report  │ │ Payment │

- MySQL 8.0│Service │ │ Service  │ │Service │ │ Service │ │ Service │

- Netflix Eureka│ 8081   │ │  8082    │ │ 8083   │ │  8084   │ │  8085   │

- Spring Cloud Gateway└────────┘ └──────────┘ └────────┘ └─────────┘ └─────────┘

- JWT Authentication    │          │            │          │           │

- Swagger/OpenAPI 3    └──────────┴────────────┴──────────┴───────────┘

- Actuator + Prometheus                          │

- Docker                    MySQL Database

```

## Quick Start

## 🎯 Services

### Local Development

```bash| Service | Port | Purpose | Endpoints |

./start-services.sh|---------|------|---------|-----------|

```| **Eureka Server** | 8761 | Service registry & discovery | `/` |

| **Gateway Service** | 8080 | API gateway & routing | All `/api/*` routes |

### Docker| **User Service** | 8081 | Authentication & JWT | `/api/auth/**` |

```bash| **Appointment Service** | 8082 | Booking & scheduling | `/api/appointments/**` |

docker-compose up --build| **Notification Service** | 8083 | Email notifications | `/api/notifications/**` |

```| **Report Service** | 8084 | File uploads (PDF, reports) | `/api/reports/**` |

| **Payment Service** | 8085 | Payment simulation | `/api/payments/**` |

## Service URLs

## 🚀 Quick Start

- Eureka: http://localhost:8761

- Gateway: http://localhost:8080### Prerequisites

- Swagger UI: http://localhost:{port}/swagger-ui.html- Java 17+

- Maven 3.6+

## ✅ Backend Optimization Complete- MySQL 8.0+

## ✅ Folder Restructured  - Git

## ✅ All Services Verified and Running

### Database Setup
```bash
mysql -u root -p
CREATE DATABASE healthbridge_user;
CREATE DATABASE healthbridge_appointment;
CREATE DATABASE healthbridge_notification;
CREATE DATABASE healthbridge_report;
CREATE DATABASE healthbridge_payment;
```

### Option 1: Using VS Code Tasks (Recommended)
1. Open project in VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Run Task"
4. Select **"🚀 Start All HealthBridge Services"**

### Option 2: Using Shell Script
```bash
cd Healthbridge
./start-all.sh
```

### Option 3: Manual Start (Development)
```bash
# Terminal 1 - Eureka Server
cd eurekaServer && mvn spring-boot:run

# Terminal 2 - Gateway (wait 30s after Eureka)
cd gatewayService && mvn spring-boot:run

# Terminal 3 - User Service
cd userService && mvn spring-boot:run

# Terminal 4 - Appointment Service
cd appointmentService && mvn spring-boot:run

# Terminal 5 - Notification Service
cd notificationService && mvn spring-boot:run

# Terminal 6 - Report Service
cd reportService && mvn spring-boot:run

# Terminal 7 - Payment Service
cd paymentService && mvn spring-boot:run
```

## 🔍 Verification

### Automated Verification
```bash
./verify-integration.sh
```

### Manual Verification

**1. Check Eureka Dashboard**
```
http://localhost:8761
```
All 6 services should show as "UP"

**2. Test Gateway Routing**
```bash
# Via Gateway
curl http://localhost:8080/api/auth/login

# Direct access
curl http://localhost:8081/api/auth/login
```

**3. Test Service Registration**
```bash
curl http://localhost:8761/eureka/apps
```

## 📝 Configuration

### Database Configuration
All services use MySQL with these credentials (configurable in `application.properties`):
- Host: `localhost:3306`
- Username: `root`
- Password: `abc1234`

### Eureka Configuration
- Server: `http://localhost:8761/eureka/`
- Register with Eureka: `true`
- Fetch Registry: `true`

### Gateway Routes
```yaml
/api/auth/**         → userService (lb://userService)
/api/appointments/** → appointmentService (lb://appointmentService)
/api/notifications/** → notificationService (lb://notificationService)
/api/reports/**      → reportService (lb://reportService)
/api/payments/**     → paymentService (lb://paymentService)
```

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.3.0
- **Cloud**: Spring Cloud 2023.0.1
- **Language**: Java 17
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security + JWT
- **Email**: Spring Mail (SMTP)
- **Build Tool**: Maven

## 📦 Dependencies

### Core Dependencies (All Services)
- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `spring-cloud-starter-netflix-eureka-client`
- `mysql-connector-j`
- `lombok`

### Service-Specific
- **User Service**: `spring-boot-starter-security`, JWT libraries
- **Notification Service**: `spring-boot-starter-mail`
- **Gateway Service**: `spring-cloud-starter-gateway`
- **Eureka Server**: `spring-cloud-starter-netflix-eureka-server`

## 🧪 Testing

### Health Check Endpoints
```bash
curl http://localhost:8761/actuator/health  # Eureka
curl http://localhost:8080/actuator/health  # Gateway
curl http://localhost:8081/actuator/health  # User Service
curl http://localhost:8082/actuator/health  # Appointment Service
curl http://localhost:8083/actuator/health  # Notification Service
curl http://localhost:8084/actuator/health  # Report Service
curl http://localhost:8085/actuator/health  # Payment Service
```

### Sample API Calls

**User Registration**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "PATIENT"
  }'
```

**User Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "password": "password123"
  }'
```

**Send Notification**
```bash
curl -X POST http://localhost:8080/api/notifications/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "patient@example.com",
    "subject": "Appointment Reminder",
    "body": "Your appointment is tomorrow at 10 AM"
  }'
```

**Process Payment**
```bash
curl -X POST "http://localhost:8080/api/payments/process?userId=1&amount=100.00"
```

## 🛑 Stopping Services

### Using Script
```bash
./stop-all.sh
```

### Using VS Code Task
Run Task → "Stop All Services"

### Manual
```bash
# Windows
taskkill /F /IM java.exe

# Linux/Mac
killall java
```

## 📁 Project Structure

```
Healthbridge/
├── eurekaServer/           # Service Registry (8761)
├── gatewayService/         # API Gateway (8080)
├── userService/            # Authentication (8081)
├── appointmentService/     # Appointments (8082)
├── notificationService/    # Notifications (8083)
├── reportService/          # Reports (8084)
├── paymentService/         # Payments (8085)
├── .vscode/
│   └── tasks.json         # VS Code automation tasks
├── start-all.sh           # Startup script
├── stop-all.sh            # Shutdown script
├── verify-integration.sh  # Verification script
└── README.md              # This file
```

## 🐛 Troubleshooting

### Services not registering with Eureka
1. Ensure Eureka Server started first
2. Wait 30-60 seconds for registration
3. Check `eureka.client.service-url.defaultZone` in application.properties

### Port already in use
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### Database connection failed
1. Verify MySQL is running
2. Check database exists: `SHOW DATABASES;`
3. Verify credentials in `application.properties`
4. Ensure MySQL is on port 3306

### Service build failures
```bash
cd <service-folder>
./mvnw clean install -DskipTests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is for educational purposes.

## 📞 Support

For issues or questions, please check the troubleshooting section or raise an issue.

---

**Built with ❤️ using Spring Boot Microservices Architecture**
