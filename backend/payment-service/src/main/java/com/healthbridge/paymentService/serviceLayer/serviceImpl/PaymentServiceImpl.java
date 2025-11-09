package com.healthbridge.paymentService.serviceLayer.serviceImpl;

import com.healthbridge.paymentService.entity.Payment;
import com.healthbridge.paymentService.repository.PaymentRepository;
import com.healthbridge.paymentService.serviceLayer.service.PaymentService;
import com.healthbridge.paymentService.external.NotificationClient;
import com.healthbridge.paymentService.external.NotificationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final NotificationClient notificationClient;

    @Override
    public Payment processPayment(Long userId, double amount) {
        Payment payment = new Payment();
        payment.setUserId(userId);
        payment.setAmount(amount);
        payment.setPaidAt(LocalDateTime.now());
        payment.setStatus("SUCCESS");

        paymentRepository.save(payment);

        notificationClient.sendNotification(new NotificationDTO(
                "user@example.com",
                "Payment of ₹" + amount + " was successful."
        ));

        return payment;
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Long getCount() {
        return paymentRepository.count();
    }
}
