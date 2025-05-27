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
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('SALES_POST')")
    public ApiResponse<PromotionResponse> createPromotion(@RequestBody PromotionRequest promotionRequest) {
        return ApiResponse.<PromotionResponse>builder()
                .code(200)
                .message("Success")
                .result(promotionService.createPromotion(promotionRequest))
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
    @GetMapping("/{id}")
    public ApiResponse<PromotionResponse> getPromotionById(@PathVariable Long id) {
        return ApiResponse.<PromotionResponse>builder()
                .code(200)
                .message("Success")
                .result(promotionService.getPromotionById(id))
                .build();
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('SALES_PUT')")
    public ApiResponse<PromotionResponse> updatePromotion(@PathVariable Long id, @RequestBody PromotionRequest promotionRequest) {
        promotionService.updatePromotion(promotionRequest);
        return ApiResponse.<PromotionResponse>builder()
                .code(200)
                .message("Success")
                .result(promotionService.getPromotionById(id))
                .build();
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('SALES_DELETE')")
    public ApiResponse<String> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Success")
                .build();
    }

    @GetMapping("/code/{code}")
    public  ApiResponse<PromotionResponse> getPromotionByCode(@PathVariable String code) {
        return ApiResponse.<PromotionResponse>builder()
                .code(200)
                .message("Success")
                .result(promotionService.getPromotionByCode(code))
                .build();
    }

    @PutMapping("/add-account/{promotionId}/{accountId}")
    @PreAuthorize("hasAuthority('SALES_PUT')")
    public ApiResponse<String> addAccountToPromotion(@PathVariable Long promotionId, @PathVariable Long accountId) {
        promotionService.addAccountToPromotion(promotionId, accountId);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Success")
                .build();
    }
}