package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.laptopshop.backend.dto.request.PermissionRequest;
import site.laptopshop.backend.dto.response.PermissionResponse;
import site.laptopshop.backend.entities.PermissionEntity;

@Mapper(componentModel = "spring")
public interface IPermissionMapper {
    PermissionEntity toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(PermissionEntity entity);
}
