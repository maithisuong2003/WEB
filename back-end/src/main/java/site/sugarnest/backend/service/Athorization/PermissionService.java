package site.sugarnest.backend.service.Athorization;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.dto.request.PermissionRequest;
import site.sugarnest.backend.dto.response.PermissionResponse;
import site.sugarnest.backend.entities.PermissionEntity;
import site.sugarnest.backend.mapper.IPermissionMapper;
import site.sugarnest.backend.reponsitories.IPermissionRepository;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class PermissionService {
    IPermissionRepository iPermissionRepository;
    IPermissionMapper iPermissionMapper;

    public PermissionResponse create(PermissionRequest request) {
        PermissionEntity permission = iPermissionMapper.toPermission(request);
        permission = iPermissionRepository.save(permission);
        return iPermissionMapper.toPermissionResponse(permission);

    }

    public List<PermissionResponse> getAll() {
        var permissions = iPermissionRepository.findAll();
        return permissions.stream().map(iPermissionMapper::toPermissionResponse).toList();
    }

    public void delete(String name) {
        iPermissionRepository.deleteById(name);
    }
}
