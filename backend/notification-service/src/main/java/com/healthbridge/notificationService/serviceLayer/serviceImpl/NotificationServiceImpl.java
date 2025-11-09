package com.healthbridge.notificationService.serviceLayer.serviceImpl;

import java.time.LocalDateTime;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.healthbridge.notificationService.entity.Notification;
import com.healthbridge.notificationService.repository.NotificationRepository;
import com.healthbridge.notificationService.serviceLayer.service.NotificationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;
    private final NotificationRepository notificationRepository;

    @Override
    public Notification sendNotification(Notification notification) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(notification.getEmail());
            mail.setSubject("HealthBridge Notification");
            mail.setText(notification.getMessage());

            mailSender.send(mail);
            notification.setStatus("SENT");
            log.info("✅ Email sent successfully to {}", notification.getEmail());
        } catch (Exception e) {
            notification.setStatus("FAILED");
            log.error("❌ Failed to send email to {}: {}", notification.getEmail(), e.getMessage(), e);
        }

        notification.setSentAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }
}
