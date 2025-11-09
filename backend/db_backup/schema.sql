-- HealthBridge Database Schema Backup
-- Generated: October 31, 2025
-- Database Architecture: Microservices Pattern (One DB per Service)

-- ============================================
-- USER SERVICE DATABASE
-- ============================================
CREATE DATABASE IF NOT EXISTS user_service_db;
USE user_service_db;

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- ============================================
-- APPOINTMENT SERVICE DATABASE
-- ============================================
CREATE DATABASE IF NOT EXISTS appointment_service_db;
USE appointment_service_db;

CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    doctor_name VARCHAR(150) NOT NULL,
    appointment_date DATETIME NOT NULL,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
);

-- ============================================
-- PAYMENT SERVICE DATABASE
-- ============================================
CREATE DATABASE IF NOT EXISTS payment_service_db;
USE payment_service_db;

CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50),
    status VARCHAR(50) DEFAULT 'PENDING',
    transaction_id VARCHAR(150) UNIQUE,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_status (status)
);

-- ============================================
-- REPORT SERVICE DATABASE
-- ============================================
CREATE DATABASE IF NOT EXISTS report_service_db;
USE report_service_db;

CREATE TABLE reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    report_type VARCHAR(100),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_report_type (report_type),
    INDEX idx_upload_date (upload_date)
);

-- ============================================
-- NOTIFICATION SERVICE DATABASE
-- ============================================
CREATE DATABASE IF NOT EXISTS notification_service_db;
USE notification_service_db;

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    is_read BOOLEAN DEFAULT FALSE,
    sent_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_read (is_read)
);

-- ============================================
-- INITIAL DATA SEEDS
-- ============================================

USE user_service_db;

-- Insert default roles
INSERT INTO roles (name) VALUES 
('PATIENT'),
('DOCTOR'),
('ADMIN')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample admin user (password: Admin@123 - hashed)
-- Note: Update with actual BCrypt hash in production
INSERT INTO users (username, email, password, role_id) VALUES 
('admin', 'admin@healthbridge.com', '$2a$10$example_hash_here', 3)
ON DUPLICATE KEY UPDATE username=username;

-- ============================================
-- DATABASE INDEXES FOR PERFORMANCE
-- ============================================

-- Composite indexes for common queries
USE appointment_service_db;
CREATE INDEX idx_user_date ON appointments(user_id, appointment_date);
CREATE INDEX idx_status_date ON appointments(status, appointment_date);

USE payment_service_db;
CREATE INDEX idx_user_status ON payments(user_id, status);
CREATE INDEX idx_date_status ON payments(payment_date, status);

USE report_service_db;
CREATE INDEX idx_user_type ON reports(user_id, report_type);

USE notification_service_db;
CREATE INDEX idx_email_read ON notifications(email, is_read);

-- ============================================
-- FOREIGN KEY RELATIONSHIPS (Cross-Service)
-- ============================================
-- Note: In microservices architecture, foreign keys across databases
-- are not enforced at the database level. Use application-level
-- consistency checks and API calls for data integrity.

-- ============================================
-- BACKUP AND RESTORE COMMANDS
-- ============================================
-- Backup all databases:
-- mysqldump -u root -p --databases user_service_db appointment_service_db payment_service_db report_service_db notification_service_db > healthbridge_backup.sql

-- Restore from backup:
-- mysql -u root -p < healthbridge_backup.sql

-- ============================================
-- PERFORMANCE TUNING RECOMMENDATIONS
-- ============================================
-- 1. Enable query cache (MySQL 5.7 and below)
-- 2. Use connection pooling (HikariCP - already configured in Spring Boot)
-- 3. Optimize JOIN queries by using appropriate indexes
-- 4. Monitor slow query log
-- 5. Consider read replicas for heavy read operations
-- 6. Implement database sharding for horizontal scaling

-- ============================================
-- SECURITY BEST PRACTICES
-- ============================================
-- 1. Use strong passwords for database users
-- 2. Grant minimum required privileges
-- 3. Enable SSL/TLS for database connections
-- 4. Regular backup and disaster recovery plan
-- 5. Implement audit logging for sensitive operations
-- 6. Use prepared statements to prevent SQL injection
-- 7. Encrypt sensitive data at rest

-- End of Schema Backup
