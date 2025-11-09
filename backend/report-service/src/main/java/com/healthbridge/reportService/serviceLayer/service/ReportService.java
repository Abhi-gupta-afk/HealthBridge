package com.healthbridge.reportService.serviceLayer.service;

import com.healthbridge.reportService.entity.Report;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ReportService {
	 Report uploadReport(Long userId, String reportType, MultipartFile file);
	 List<Report> getReportsByUser(Long userId);
	 List<Report> getAllReports();
}