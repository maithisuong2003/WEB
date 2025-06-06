package site.laptopshop.backend.service.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.dto.dto.ProductDto;
import site.laptopshop.backend.dto.dto.SizeColorProductDto;
import site.laptopshop.backend.entities.ProductEntity;
import site.laptopshop.backend.entities.SizeColorProductEntity;
import site.laptopshop.backend.mapper.IProductMapper;
import site.laptopshop.backend.reponsitories.IInventoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class InventoryService {

    private IInventoryRepository inventoryRepository;
    private IProductMapper productMapper;

    public List<ProductDto> getProductsOutOfStock(Integer threshold) {
        List<SizeColorProductEntity> sizeColorProductEntities = inventoryRepository.findProductsOutOfStock(threshold);
        Map<ProductEntity, List<SizeColorProductEntity>> productToSizeColorMap = sizeColorProductEntities.stream()
                .collect(Collectors.groupingBy(SizeColorProductEntity::getProductEntity));

        return productToSizeColorMap.entrySet().stream()
                .map(entry -> {
                    ProductDto productDto = productMapper.mapToProductDto(entry.getKey());
                    productDto.setSizeColorProductsEntity(entry.getValue());
                    return productDto;
                })
                .collect(Collectors.toList());
    }
}
