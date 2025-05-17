package site.sugarnest.backend.dto.dto;

import lombok.Data;
import site.sugarnest.backend.entities.InventoryEntity;

@Data
public class SizeColorProductDto {
    private InventoryEntity inventoryEntity;
    private String size;
    private String color;
}
