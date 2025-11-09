#!/bin/bash

# HealthBridge Microservices Startup Script
# This script starts all 7 services in the correct order

echo "🚀 Starting HealthBridge Microservices Platform"
echo "================================================"

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "⚠️  MySQL is not running. Please start MySQL first."
    exit 1
fi

# Function to wait for service to start
wait_for_service() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Waiting for $service on port $port..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port > /dev/null 2>&1; then
            echo "✅ $service is UP on port $port"
            return 0
        fi
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "❌ $service failed to start on port $port"
    return 1
}

# Start Eureka Server (8761)
echo ""
echo "1️⃣  Starting Eureka Server (Service Registry)..."
cd eureka-server
./mvnw spring-boot:run > /tmp/eureka.log 2>&1 &
EUREKA_PID=$!
cd ..
wait_for_service "Eureka Server" 8761

# Start Gateway Service (8080)
echo ""
echo "2️⃣  Starting Gateway Service (API Gateway)..."
cd gateway-service
./mvnw spring-boot:run > /tmp/gateway.log 2>&1 &
GATEWAY_PID=$!
cd ..
wait_for_service "Gateway Service" 8080

# Start User Service (8081)
echo ""
echo "3️⃣  Starting User Service (Authentication)..."
cd user-service
./mvnw spring-boot:run > /tmp/user.log 2>&1 &
USER_PID=$!
cd ..
wait_for_service "User Service" 8081

# Start Appointment Service (8082)
echo ""
echo "4️⃣  Starting Appointment Service..."
cd appointment-service
./mvnw spring-boot:run > /tmp/appointment.log 2>&1 &
APPOINTMENT_PID=$!
cd ..
wait_for_service "Appointment Service" 8082

# Start Notification Service (8083)
echo ""
echo "5️⃣  Starting Notification Service..."
cd notification-service
./mvnw spring-boot:run > /tmp/notification.log 2>&1 &
NOTIFICATION_PID=$!
cd ..
wait_for_service "Notification Service" 8083

# Start Report Service (8084)
echo ""
echo "6️⃣  Starting Report Service..."
cd report-service
./mvnw spring-boot:run > /tmp/report.log 2>&1 &
REPORT_PID=$!
cd ..
wait_for_service "Report Service" 8084

# Start Payment Service (8085)
echo ""
echo "7️⃣  Starting Payment Service..."
cd payment-service
./mvnw spring-boot:run > /tmp/payment.log 2>&1 &
PAYMENT_PID=$!
cd ..
wait_for_service "Payment Service" 8085

echo ""
echo "================================================"
echo "✅ All HealthBridge Services Started Successfully!"
echo "================================================"
echo ""
echo "📊 Service Status:"
echo "  • Eureka Server:         http://localhost:8761"
echo "  • Gateway Service:       http://localhost:8080"
echo "  • User Service:          http://localhost:8081"
echo "  • Appointment Service:   http://localhost:8082"
echo "  • Notification Service:  http://localhost:8083"
echo "  • Report Service:        http://localhost:8084"
echo "  • Payment Service:       http://localhost:8085"
echo ""
echo "🌐 Eureka Dashboard: http://localhost:8761"
echo "🔐 API Gateway:      http://localhost:8080"
echo ""
echo "Process IDs saved:"
echo "$EUREKA_PID $GATEWAY_PID $USER_PID $APPOINTMENT_PID $NOTIFICATION_PID $REPORT_PID $PAYMENT_PID" > .healthbridge_pids
echo ""
echo "To stop all services, run: ./stop-all.sh"
