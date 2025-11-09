package com.healthbridge.reportService.serviceLayer.serviceImpl;

import com.healthbridge.reportService.entity.Report;
import com.healthbridge.reportService.repository.ReportRepository;
import com.healthbridge.reportService.serviceLayer.service.ReportService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public Report uploadReport(Long userId, String reportType, MultipartFile file) {
        try {
            Report report = new Report();
            report.setUserId(userId);
            report.setReportType(reportType);
            report.setFileName(file.getOriginalFilename());
            report.setFileData(file.getBytes());
            report.setUploadedAt(LocalDateTime.now());

            return reportRepository.save(report);
        } catch (Exception e) {
            throw new RuntimeException("File upload failed: " + e.getMessage());
        }
    }

    @Override
    public List<Report> getReportsByUser(Long userId) {
        return reportRepository.findByUserId(userId);
    }

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}
