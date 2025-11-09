package com.healthbridge.reportService.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String reportType;
    private String fileName;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;
    
    private LocalDateTime uploadedAt;
}
