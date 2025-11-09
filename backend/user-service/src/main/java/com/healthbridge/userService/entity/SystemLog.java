package com.healthbridge.userService.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "system_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;
    private String description;
    private Long userId;
    private LocalDateTime timestamp;

    public SystemLog(String eventType, String description, Long userId) {
        this.eventType = eventType;
        this.description = description;
        this.userId = userId;
        this.timestamp = LocalDateTime.now();
    }
}
