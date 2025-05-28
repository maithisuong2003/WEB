package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.response.CartItemResponse;
import site.laptopshop.backend.entities.CartItemEntity;

@Mapper(componentModel = "spring")

public interface ICartMapper {
    CartItemResponse mapToCartItemDto(CartItemEntity cartItemEntity);

    CartItemEntity mapToCartItemEntity(CartItemResponse cartItemDto);
}
