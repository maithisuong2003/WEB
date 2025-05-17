package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.dto.SupplierDto;
import site.sugarnest.backend.entities.SupplierEntity;

@Mapper(componentModel = "spring")
public interface ISupplierMapper {
    SupplierDto mapToSupplierDto(SupplierEntity supplierEntity);
    SupplierEntity mapToSupplier(SupplierDto supplierDto);

}
