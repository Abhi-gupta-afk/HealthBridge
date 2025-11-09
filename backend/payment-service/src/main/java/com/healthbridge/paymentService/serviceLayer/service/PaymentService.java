package com.healthbridge.paymentService.serviceLayer.service;

import com.healthbridge.paymentService.entity.Payment;

import java.util.List;

public interface PaymentService {
    Payment processPayment(Long userId, double amount);
    List<Payment> getAllPayments();
    Long getCount();
}
