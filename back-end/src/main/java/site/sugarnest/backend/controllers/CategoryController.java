package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.dto.CategoryDto;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.service.product.CategoryService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/categories")
@AllArgsConstructor
public class CategoryController {
    private CategoryService categoryService;

    @GetMapping("/all")
    public ApiResponse<List<CategoryDto>> getAllCategory() {
        return ApiResponse.<List<CategoryDto>>builder()
                .message("Success")
                .result(categoryService.getAllCategory())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryDto> getCategoryById(Long id) {
        return ApiResponse.<CategoryDto>builder()
                .message("Success")
                .result(categoryService.getCategoryById(id))
                .build();
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('PRODUCTS_POST')")
    public ApiResponse<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) {
        if (categoryService.checkCategoryExistByName(categoryDto.getNameCategory())) {
            return ApiResponse.<CategoryDto>builder()
                    .message("Category already exists!")
                    .result(null)
                    .build();
        }
        return ApiResponse.<CategoryDto>builder()
                .message("Category created!")
                .result(categoryService.createCategory(categoryDto))
                .build();
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('PRODUCTS_PUT')")
    public ApiResponse<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto) {
        if (categoryService.checkCategoryExistByName(categoryDto.getNameCategory())) {
            return ApiResponse.<CategoryDto>builder()
                    .message("Category already exists!")
                    .result(null)
                    .build();
        }
        return ApiResponse.<CategoryDto>builder()
                .message("Category updated!")
                .result(categoryService.updateCategory(categoryDto))
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PRODUCTS_DELETE')")
    public void deleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteCategory(id);
    }



}
