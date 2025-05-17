package site.sugarnest.backend.controllers;


import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.dto.ProducerDto;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.service.product.ProducerService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/producers")
@AllArgsConstructor
public class ProducerController {

    ProducerService producerService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('PRODUCTS_POST')")
    public ApiResponse<ProducerDto> createProducer(@RequestBody ProducerDto producerDto) {
        if (producerService.checkProducerExistByName(producerDto.getNameProducer())) {
            return ApiResponse.<ProducerDto>builder()
                    .message("Producer already exists!")
                    .result(null)
                    .build();
        }
        return ApiResponse.<ProducerDto>builder()
                .message("Producer created!")
                .result(producerService.createProducer(producerDto))
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<ProducerDto>> getAllProducers() {
        return ApiResponse.<List<ProducerDto>>builder()
                .message("Success")
                .result(producerService.getAllProducers())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ProducerDto> getProducerById(@PathVariable("id") Long id) {
        return ApiResponse.<ProducerDto>builder()
                .message("Success")
                .result(producerService.getProducerById(id))
                .build();
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('PRODUCTS_PUT')")
    public ApiResponse<ProducerDto> updateProducer(@RequestBody ProducerDto producerDto) {
        if (producerService.checkProducerExistByName(producerDto.getNameProducer())) {
            return ApiResponse.<ProducerDto>builder()
                    .message("Producer already exists!")
                    .result(null)
                    .build();
        }
        return ApiResponse.<ProducerDto>builder()
                .message("Producer updated!")
                .result(producerService.updateProducer(producerDto))
                .build();
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('PRODUCTS_DELETE')")
    public ApiResponse<String> deleteProducer(@PathVariable("id") Long id) {
        producerService.deleteProducer(id);
        return ApiResponse.<String>builder()
                .message("Producer deleted!")
                .result("Success")
                .build();
    }

}
