package site.sugarnest.backend.service.product;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.dto.dto.ProductDto;
import site.sugarnest.backend.entities.ProductEntity;
import site.sugarnest.backend.entities.SizeColorProductEntity;
import site.sugarnest.backend.mapper.IProductMapper;
import site.sugarnest.backend.reponsitories.IInventoryRepository;

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
