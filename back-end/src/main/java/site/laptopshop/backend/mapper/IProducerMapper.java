package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.dto.ProducerDto;
import site.laptopshop.backend.entities.ProducerEntity;

@Mapper(componentModel = "spring")

public interface IProducerMapper {
    ProducerDto mapToProducerDto(ProducerEntity producer);
    ProducerEntity mapToProducer(ProducerDto producer);
}
