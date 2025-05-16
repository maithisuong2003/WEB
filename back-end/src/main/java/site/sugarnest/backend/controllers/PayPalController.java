package site.sugarnest.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.PaymentRequest;
import site.sugarnest.backend.service.payment.PayPalService;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    @Autowired
    private PayPalService payPalService;

    @PostMapping("/create-payment")
    public Map<String, String> createPayment(@RequestBody PaymentRequest paymentRequest) {
        return payPalService.createPayment(paymentRequest);
    }

    @GetMapping("/execute-payment")
    public String executePayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        return payPalService.executePayment(paymentId, payerId);
    }
}
