package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.dto.ProductDto;
import site.sugarnest.backend.dto.dto.ProductFilterDto;
import site.sugarnest.backend.service.product.IProductService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private IProductService iProductService;
    @GetMapping
    public Page<ProductDto> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) List<String> suppliers,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {

        ProductFilterDto filter = new ProductFilterDto();
        filter.setCategories(categories);

        Pageable pageable = PageRequest.of(page, size);
        return iProductService.getAllProduct(pageable, filter);
    }

}
