package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import site.sugarnest.backend.dto.request.PermissionRequest;
import site.sugarnest.backend.dto.response.PermissionResponse;
import site.sugarnest.backend.entities.PermissionEntity;

@Mapper(componentModel = "spring")
public interface IPermissionMapper {
    PermissionEntity toPermission(PermissionRequest request);
    PermissionResponse toPermissionResponse(PermissionEntity entity);
}
