package site.laptopshop.backend.dto.dto;

import lombok.Data;
import site.laptopshop.backend.entities.InventoryEntity;

@Data
public class SizeColorProductDto {
    private InventoryEntity inventoryEntity;
    private String size;
    private String color;
}
