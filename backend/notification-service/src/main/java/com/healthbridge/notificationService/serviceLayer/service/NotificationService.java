package com.healthbridge.notificationService.serviceLayer.service;

import com.healthbridge.notificationService.entity.Notification;

public interface NotificationService {
    Notification sendNotification(Notification notification);
}
