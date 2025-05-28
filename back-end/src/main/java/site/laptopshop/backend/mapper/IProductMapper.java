package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.dto.ProductDto;
import site.laptopshop.backend.entities.ProductEntity;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDto mapToProductDto(ProductEntity product);
}
