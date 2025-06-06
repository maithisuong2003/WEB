package site.laptopshop.backend.service.product;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.laptopshop.backend.dto.dto.ProductDto;
import site.laptopshop.backend.dto.dto.ProductFilterDto;

import java.util.List;

public interface IProductService {
    Page<ProductDto> getAllProduct(Pageable pageable);

    Page<ProductDto> getAllProduct(Pageable pageable, ProductFilterDto filter);
    ProductDto getProductById(Long productId);
    Page<ProductDto> searchProduct(String nameProduct, int page, int size);
    List<ProductDto> getProductByAdmin();
    ProductDto createProduct(ProductDto productDto);
    ProductDto updateProduct(Long productId, ProductDto updateProduct);

    void deleteProduct(Long productId);
    Long getTotalProducts();

}

