package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import site.sugarnest.backend.dto.request.RoleRequest;
import site.sugarnest.backend.dto.response.RoleResponse;
import site.sugarnest.backend.entities.RoleEntity;

@Mapper(componentModel = "spring")

public interface IRoleMapper {

    @Mapping(target = "permissions", ignore = true)
    RoleEntity toRole(RoleRequest request);
    RoleResponse toRoleResponse(RoleEntity entity);
}
