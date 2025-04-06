package site.sugarnest.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Table(name = "roles")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class RoleEntity {
    @Id
    private String name;
    private  String description;

    @ManyToMany(fetch = FetchType.LAZY)
    Set<PermissionEntity> permissions;
}
