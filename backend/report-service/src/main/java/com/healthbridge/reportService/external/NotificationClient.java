package com.healthbridge.reportService.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notificationService")
public interface NotificationClient {
    @PostMapping("/api/notifications/send")
    void sendNotification(@RequestBody NotificationDTO dto);
}
