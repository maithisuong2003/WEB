package site.laptopshop.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.laptopshop.backend.dto.dto.RateDto;
import site.laptopshop.backend.dto.response.ApiResponse;
import site.laptopshop.backend.reponsitories.IOrderDetailRepository;
import site.laptopshop.backend.reponsitories.IRateRepository;
import site.laptopshop.backend.service.product.RatingService;


@CrossOrigin("*")
@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private IRateRepository rateRepository;

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Autowired
    private RatingService ratingService;

        @GetMapping("/purchases/check")
        public ApiResponse<Boolean> checkPurchase(@RequestParam Long accountId, @RequestParam Long productId) {
            return ApiResponse.<Boolean>builder()
                    .code(200)
                    .message("Success")
                    .result(ratingService.checkPurchase(accountId, productId))
                    .build();
        }

    @GetMapping
    public ApiResponse<RateDto> getRating(@RequestParam Long accountId, @RequestParam Long productId) {
        return ApiResponse.<RateDto>builder()
                .code(200)
                .message("Success")
                .result(ratingService.getRating(accountId, productId))
                .build();
    }
    @GetMapping("/avg")
    public ApiResponse<Double> getAvgRating(@RequestParam Long productId) {
        return ApiResponse.<Double>builder()
                .code(200)
                .message("Success")
                .result(ratingService.getAvgRating(productId))
                .build();
    }

    @PostMapping
    public ApiResponse<RateDto> createRating(@RequestBody RateDto rate) {
        return ApiResponse.<RateDto>builder()
                .code(200)
                .message("Success")
                .result(ratingService.createRating(rate))
                .build();
    }

    @PutMapping
    public ApiResponse<RateDto> updateRating(@RequestBody RateDto rate) {
        return ApiResponse.<RateDto>builder()
                .code(200)
                .message("Success")
                .result(ratingService.updateRating(rate))
                .build();
    }
}

