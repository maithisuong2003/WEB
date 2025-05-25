package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.PromotionRequest;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.dto.response.PromotionResponse;
import site.sugarnest.backend.service.promotion.PromotionService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/promotion")
@AllArgsConstructor
public class PromotionController {
    private PromotionService promotionService;

    @GetMapping("/all")
    public ApiResponse<List<PromotionResponse>> getAllPromotions() {
        return ApiResponse.<List<PromotionResponse>>builder()
                .code(200)
                .message("Success")
                .result(promotionService.getAllPromotions())
                .build();
    }
}