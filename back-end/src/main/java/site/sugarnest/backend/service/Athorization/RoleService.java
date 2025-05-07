package site.sugarnest.backend.service.Athorization;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.dto.request.PermissionRequest;
import site.sugarnest.backend.dto.request.RoleRequest;
import site.sugarnest.backend.dto.response.RoleResponse;
import site.sugarnest.backend.exception.AppException;
import site.sugarnest.backend.exception.ErrorCode;
import site.sugarnest.backend.mapper.IRoleMapper;
import site.sugarnest.backend.reponsitoties.IPermissionRepository;
import site.sugarnest.backend.reponsitoties.IRoleRepository;

import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class RoleService {
    IRoleRepository iRoleRepository;
    IPermissionRepository iPermissionRepository;
    IRoleMapper iRoleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = iRoleMapper.toRole(request);
        if (iRoleRepository.existsById(role.getName())) {
            throw new RuntimeException("Role already exists");
        }
        if (request.getPermissions() == null || request.getPermissions().isEmpty()) {
            role.setPermissions(new HashSet<>());

        } else {
            var permission = iPermissionRepository.findAllById(request.getPermissions());
            role.setPermissions(new HashSet<>(permission));
        }
        role = iRoleRepository.save(role);
        return iRoleMapper.toRoleResponse(role);
    }

    public RoleResponse addPermission(String name, PermissionRequest permissionRequest) {
        var role = iRoleRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXITED));
        var permission = iPermissionRepository.findById(permissionRequest.getName()).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXITED));
        role.getPermissions().add(permission);
        role = iRoleRepository.save(role);
        return iRoleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        var roles = iRoleRepository.findAll();
        return roles.stream()
                .filter(role -> !role.getName().equalsIgnoreCase("ADMIN"))
                .map(iRoleMapper::toRoleResponse)
                .toList();
    }

    public void delete(String name) {
        iRoleRepository.deleteById(name);
    }

    public RoleResponse deletePermission(String name, String permissionName) {
        var role = iRoleRepository.findById(name).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXITED));
        var permission = iPermissionRepository.findById(permissionName).orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXITED));
        role.getPermissions().remove(permission);
        role = iRoleRepository.save(role);
        return iRoleMapper.toRoleResponse(role);
    }
}
