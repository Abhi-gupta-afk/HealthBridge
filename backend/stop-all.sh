#!/bin/bash

# HealthBridge Microservices Stop Script

echo "🛑 Stopping HealthBridge Microservices..."

if [ -f .healthbridge_pids ]; then
    PIDS=$(cat .healthbridge_pids)
    for PID in $PIDS; do
        if ps -p $PID > /dev/null 2>&1; then
            kill $PID
            echo "✅ Stopped process $PID"
        fi
    done
    rm .healthbridge_pids
fi

# Fallback: Kill all Java processes running Spring Boot
pkill -f "spring-boot:run"

echo "✅ All services stopped"
