package com.healthbridge.paymentService.repository;

import com.healthbridge.paymentService.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
