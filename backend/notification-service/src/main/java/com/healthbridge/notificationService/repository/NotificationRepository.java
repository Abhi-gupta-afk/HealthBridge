package com.healthbridge.notificationService.repository;

import com.healthbridge.notificationService.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
