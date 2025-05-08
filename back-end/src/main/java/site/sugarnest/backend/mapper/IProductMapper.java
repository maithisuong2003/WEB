package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.dto.ProductDto;
import site.sugarnest.backend.entities.ImageProductEntity;
import site.sugarnest.backend.entities.ProductEntity;
import site.sugarnest.backend.entities.SizeColorProductEntity;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDto mapToProductDto(ProductEntity product);
}
