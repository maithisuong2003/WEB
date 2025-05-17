package site.sugarnest.backend.dto.dto;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SupplierDto {
    private Long id;

    private String nameSupplier;

    private String isActive;
}
