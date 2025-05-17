package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.dto.ProducerDto;
import site.sugarnest.backend.entities.ProducerEntity;

@Mapper(componentModel = "spring")

public interface IProducerMapper {
    ProducerDto mapToProducerDto(ProducerEntity producer);
    ProducerEntity mapToProducer(ProducerDto producer);
}
