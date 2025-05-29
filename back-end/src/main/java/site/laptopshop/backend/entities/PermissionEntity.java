package site.laptopshop.backend.entities;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "permissions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class PermissionEntity {
    @Id
    private String name;
    private  String description;

}
