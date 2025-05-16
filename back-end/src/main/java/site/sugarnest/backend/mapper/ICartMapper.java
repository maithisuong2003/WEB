package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.response.CartItemResponse;
import site.sugarnest.backend.entities.CartItemEntity;

@Mapper(componentModel = "spring")

public interface ICartMapper {
    CartItemResponse mapToCartItemDto(CartItemEntity cartItemEntity);

    CartItemEntity mapToCartItemEntity(CartItemResponse cartItemDto);
}
