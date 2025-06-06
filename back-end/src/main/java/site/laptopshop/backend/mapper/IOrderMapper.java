package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.response.OrderResponse;
import site.laptopshop.backend.entities.OrderEntity;

@Mapper(componentModel = "spring")
public interface IOrderMapper {
    OrderResponse toOrderEntity(OrderEntity orderEntity);
}
