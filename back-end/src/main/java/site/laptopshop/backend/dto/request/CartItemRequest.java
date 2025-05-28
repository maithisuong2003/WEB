package site.laptopshop.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemRequest {
    private Long accountId;
    private Long productId;
    private Integer cartId;
    private int quantity;
    private String productSize;
    private String productColor;
}
