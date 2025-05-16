package site.sugarnest.backend.service.product;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import site.sugarnest.backend.dto.dto.ProductDto;
import site.sugarnest.backend.dto.dto.ProductFilterDto;

import java.util.List;

public interface IProductService {
    Page<ProductDto> getAllProduct(Pageable pageable);

    Page<ProductDto> getAllProduct(Pageable pageable, ProductFilterDto filter);
    ProductDto getProductById(Long productId);

}

