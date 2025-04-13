package site.sugarnest.backend.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;
import site.sugarnest.backend.entities.PermissionEntity;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
    String name;
    String description;
    Set<PermissionEntity> permissions;
}
