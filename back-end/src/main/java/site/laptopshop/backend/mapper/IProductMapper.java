package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import site.laptopshop.backend.dto.dto.ProductDto;
import site.laptopshop.backend.entities.*;

@Mapper(componentModel = "spring")
public interface IProductMapper {
    ProductDto mapToProductDto(ProductEntity product);
    ProductEntity mapToProduct(ProductDto product);
    ImageProductEntity mapToImageProduct(ImageProductEntity imageProductDto);
    SizeColorProductEntity mapToSizeColorProduct(SizeColorProductEntity SizeColorProductDto);
}
