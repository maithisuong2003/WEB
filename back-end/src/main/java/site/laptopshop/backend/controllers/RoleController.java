package site.laptopshop.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.laptopshop.backend.dto.request.PermissionRequest;
import site.laptopshop.backend.dto.request.RoleRequest;
import site.laptopshop.backend.dto.response.ApiResponse;
import site.laptopshop.backend.dto.response.RoleResponse;
import site.laptopshop.backend.service.Athorization.RoleService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/roles")
@AllArgsConstructor
public class RoleController {
    RoleService roleService;

    @PostMapping
    @PreAuthorize("hasAuthority('ACCOUNTS_POST')")
    ApiResponse<RoleResponse> createRole(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .message("Permission created!")
                .result(roleService.create(request))
                .build();
    }

    @PostMapping("/{name}/permissions")
    @PreAuthorize("hasAuthority('ACCOUNTS_POST')")
    ApiResponse<RoleResponse> addPermission(@PathVariable String name, @RequestBody PermissionRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .message("Permission added!")
                .result(roleService.addPermission(name, request))
                .build();
    }
    @GetMapping
    @PreAuthorize("hasAuthority('ACCOUNTS_GET')")
    ApiResponse<List<RoleResponse>> getAllRole() {
        return ApiResponse.<List<RoleResponse>>builder()
                .message("All permissions!")
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("hasAuthority('ACCOUNTS_DELETE')")
    ApiResponse<Void> deleteRole(@PathVariable String name) {
        roleService.delete(name);
        return ApiResponse.<Void>builder()
                .message("Permission deleted!")
                .build();
    }

    @DeleteMapping("/{name}/permissions/{permissionName}")
    @PreAuthorize("hasAuthority('ACCOUNTS_DELETE')")
    ApiResponse<RoleResponse> deletePermission(@PathVariable String name, @PathVariable String permissionName) {
        return ApiResponse.<RoleResponse>builder()
                .message("Permission deleted!")
                .result(roleService.deletePermission(name, permissionName))
                .build();
    }

}
