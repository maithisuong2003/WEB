package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import site.laptopshop.backend.dto.request.RoleRequest;
import site.laptopshop.backend.dto.response.RoleResponse;
import site.laptopshop.backend.entities.RoleEntity;

@Mapper(componentModel = "spring")

public interface IRoleMapper {

    @Mapping(target = "permissions", ignore = true)
    RoleEntity toRole(RoleRequest request);
    RoleResponse toRoleResponse(RoleEntity entity);
}
