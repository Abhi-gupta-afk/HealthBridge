package com.healthbridge.paymentService.controller;

import com.healthbridge.paymentService.entity.Payment;
import com.healthbridge.paymentService.serviceLayer.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/process")
    public Payment processPayment(@RequestParam Long userId,
                                  @RequestParam double amount) {
        return paymentService.processPayment(userId, amount);
    }

    @PostMapping("/charge")
    public Payment chargePayment(@RequestParam Long userId,
                                 @RequestParam double amount) {
        return paymentService.processPayment(userId, amount);
    }

    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/count")
    public Long getPaymentsCount() {
        return paymentService.getCount();
    }
}
