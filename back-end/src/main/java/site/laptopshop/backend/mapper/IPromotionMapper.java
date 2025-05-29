package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.request.PromotionRequest;
import site.laptopshop.backend.dto.response.PromotionResponse;
import site.laptopshop.backend.entities.PromotionEntity;

@Mapper(componentModel = "spring")
public interface IPromotionMapper {

    PromotionEntity mapToPromotionEntity(PromotionRequest promotionRequest);
    PromotionResponse mapToPromotionDto(PromotionEntity promotionEntity);

}
