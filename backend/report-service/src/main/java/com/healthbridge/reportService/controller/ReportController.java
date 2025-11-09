package com.healthbridge.reportService.controller;

import com.healthbridge.reportService.entity.Report;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.healthbridge.reportService.serviceLayer.service.ReportService;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/upload")
    public ResponseEntity<Report> upload(@RequestParam Long userId,
                         @RequestParam String reportType,
                         @RequestParam MultipartFile file) {
        return ResponseEntity.ok(reportService.uploadReport(userId, reportType, file));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Report>> getReportsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(reportService.getReportsByUser(userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }
}
