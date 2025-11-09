#!/bin/bash

# HealthBridge Services Health Check
echo "=============================================="
echo "🏥 HealthBridge Services Health Check"
echo "=============================================="
echo ""

check_service() {
    SERVICE_NAME=$1
    PORT=$2
    
    if curl -s "http://localhost:$PORT/actuator/health" > /dev/null 2>&1; then
        echo "✅ $SERVICE_NAME (Port $PORT) - Running"
    else
        echo "❌ $SERVICE_NAME (Port $PORT) - Not responding"
    fi
}

# Check Eureka
echo "🔍 Service Discovery:"
check_service "Eureka Server" 8761
echo ""

# Check Gateway
echo "🌐 API Gateway:"
check_service "Gateway Service" 8080
echo ""

# Check Microservices
echo "📦 Microservices:"
check_service "User Service" 8081
check_service "Appointment Service" 8082
check_service "Notification Service" 8083
check_service "Report Service" 8084
check_service "Payment Service" 8085
echo ""

# Check Eureka Registration
echo "📋 Eureka Registration Status:"
if curl -s "http://localhost:8761/eureka/apps" | grep -q "user-service"; then
    echo "✅ user-service registered"
else
    echo "❌ user-service not registered"
fi

if curl -s "http://localhost:8761/eureka/apps" | grep -q "appointment-service"; then
    echo "✅ appointment-service registered"
else
    echo "❌ appointment-service not registered"
fi

if curl -s "http://localhost:8761/eureka/apps" | grep -q "notification-service"; then
    echo "✅ notification-service registered"
else
    echo "❌ notification-service not registered"
fi

if curl -s "http://localhost:8761/eureka/apps" | grep -q "report-service"; then
    echo "✅ report-service registered"
else
    echo "❌ report-service not registered"
fi

if curl -s "http://localhost:8761/eureka/apps" | grep -q "payment-service"; then
    echo "✅ payment-service registered"
else
    echo "❌ payment-service not registered"
fi

echo ""
echo "=============================================="
echo "Health check complete!"
echo "=============================================="
