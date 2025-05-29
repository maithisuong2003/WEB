package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.dto.SupplierDto;
import site.laptopshop.backend.entities.SupplierEntity;

@Mapper(componentModel = "spring")
public interface ISupplierMapper {
    SupplierDto mapToSupplierDto(SupplierEntity supplierEntity);
    SupplierEntity mapToSupplier(SupplierDto supplierDto);

}
