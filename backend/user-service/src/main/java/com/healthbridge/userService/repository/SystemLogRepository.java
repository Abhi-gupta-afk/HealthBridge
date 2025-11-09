package com.healthbridge.userService.repository;

import com.healthbridge.userService.entity.SystemLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
    long countByEventType(String eventType);
}
