package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.dto.ProductDto;
import site.sugarnest.backend.dto.dto.ProductFilterDto;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.service.product.IProductService;
import site.sugarnest.backend.service.product.InventoryService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    private IProductService iProductService;
    private InventoryService inventoryService;

    @PostMapping
    @PreAuthorize("hasAuthority('PRODUCTS_POST')")
    public ApiResponse<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto saveProduct = iProductService.createProduct(productDto);
        return ApiResponse.<ProductDto>builder()
                .message("Product created!")
                .result(saveProduct)
                .build();
    }

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
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);
        filter.setSuppliers(suppliers);
        filter.setCategories(categories);
        filter.setSortBy(sortBy);
        filter.setSortDirection(sortDirection);

        Pageable pageable = PageRequest.of(page, size);
        return iProductService.getAllProduct(pageable, filter);
    }
    @GetMapping("/search/{nameProduct}")
    public ApiResponse<Page<ProductDto>> searchProduct(
            @PathVariable("nameProduct") String nameProduct,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<ProductDto> productDtos = iProductService.searchProduct(nameProduct, page, size);
        return ApiResponse.<Page<ProductDto>>builder()
                .message("Success")
                .result(productDtos)
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<ProductDto> getProductById(@PathVariable("id") Long id) {
        ProductDto productDto = iProductService.getProductById(id);
        return ApiResponse.<ProductDto>builder()
                .message("Success")
                .result(productDto)
                .build();
    }



    @GetMapping("/all")
    public ApiResponse<List<ProductDto>> getProductByAdmin() {
        List<ProductDto> productDtos = iProductService.getProductByAdmin();
        return ApiResponse.<List<ProductDto>>builder()
                .message("Success")
                .result(productDtos)
                .build();
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('PRODUCTS_PUT')")
    public ApiResponse<ProductDto> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDto updateProduct) {
        ProductDto productDto = iProductService.updateProduct(id, updateProduct);
        return ApiResponse.<ProductDto>builder()
                .message("Product updated!")
                .result(productDto)
                .build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PRODUCTS_DELETE')")
    public ApiResponse<String> deleteProduct(@PathVariable("id") Long id) {
        iProductService.deleteProduct(id);
        return ApiResponse.<String>builder()
                .message("Product deleted!")
                .build();
    }

    @GetMapping("/out-of-stock/{threshold}")
    @PreAuthorize("hasAuthority('PRODUCTS_GET')")
    public ApiResponse<List<ProductDto>> findProductOutOfStock(@PathVariable("threshold") Integer threshold ){
        List<ProductDto> sizeColorProductEntity = inventoryService.getProductsOutOfStock(threshold);
        return ApiResponse.<List<ProductDto>>builder()
                .message("Success")
                .result(sizeColorProductEntity)
                .build();
    }

    @GetMapping("/total")
    @PreAuthorize("hasAuthority('PRODUCTS_GET')")
    public ApiResponse<Long> getTotalProducts() {
        Long totalProducts = iProductService.getTotalProducts();
        return ApiResponse.<Long>builder()
                .message("Success")
                .result(totalProducts)
                .build();
    }
}
