package site.laptopshop.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.laptopshop.backend.dto.request.OrderRequest;
import site.laptopshop.backend.dto.response.ApiResponse;
import site.laptopshop.backend.dto.response.OrderResponse;
import site.laptopshop.backend.service.order.IOrderService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private IOrderService iorderService;

    @PostMapping
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse orderResponse = iorderService.saveOrder(orderRequest);
        return ApiResponse.<OrderResponse>builder()
                .code(200)
                .result(orderResponse)
                .build();
    }

    @GetMapping("my-orders")
    public ApiResponse<List<OrderResponse>> getMyOrders() {
        List<OrderResponse> orderResponseList = iorderService.getOrders();
        return ApiResponse.<List<OrderResponse>>builder()
                .code(200)
                .result(orderResponseList)
                .build();
    }
}
