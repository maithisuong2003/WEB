package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.request.PromotionRequest;
import site.sugarnest.backend.dto.response.PromotionResponse;
import site.sugarnest.backend.entities.PromotionEntity;

@Mapper(componentModel = "spring")
public interface IPromotionMapper {

    PromotionEntity mapToPromotionEntity(PromotionRequest promotionRequest);
    PromotionResponse mapToPromotionDto(PromotionEntity promotionEntity);

}
