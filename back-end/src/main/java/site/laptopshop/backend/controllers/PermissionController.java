package site.laptopshop.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.laptopshop.backend.dto.request.PermissionRequest;
import site.laptopshop.backend.dto.response.ApiResponse;
import site.laptopshop.backend.dto.response.PermissionResponse;
import site.laptopshop.backend.service.Athorization.PermissionService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/permissions")
@AllArgsConstructor
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    @PreAuthorize("hasAuthority('ACCOUNTS_POST')")
    ApiResponse<PermissionResponse> createPermission(@RequestBody PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .message("Permission created!")
                .result(permissionService.create(request))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ACCOUNTS_GET')")
    ApiResponse<List<PermissionResponse>> getAllPermission() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .message("All permissions!")
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("/{name}")
    @PreAuthorize("hasAuthority('ACCOUNTS_DELETE')")
    ApiResponse<Void> deletePermission(@PathVariable String name) {
        permissionService.delete(name);
        return ApiResponse.<Void>builder()
                .message("Permission deleted!")
                .build();
    }

}
