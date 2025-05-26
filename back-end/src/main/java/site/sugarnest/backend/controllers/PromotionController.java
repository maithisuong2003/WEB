package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.PromotionRequest;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.dto.response.PromotionResponse;
import site.sugarnest.backend.exception.AppException;
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
    @GetMapping("/saved")
    public ApiResponse<List<PromotionResponse>> getSavedPromotions(@RequestParam Long accountId) {
        return ApiResponse.<List<PromotionResponse>>builder()
                .code(200)
                .message("Success")
                .result(promotionService.getSavedPromotions(accountId))
                .build();
    }

    @PostMapping("/save")
    public ResponseEntity<?> savePromotionForAccount(@RequestParam Long promotionId, @RequestParam Long accountId) {
        try {
            promotionService.addAccountToPromotion(promotionId, accountId);
            return ResponseEntity.ok("Lưu mã thành công");
        } catch (AppException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}