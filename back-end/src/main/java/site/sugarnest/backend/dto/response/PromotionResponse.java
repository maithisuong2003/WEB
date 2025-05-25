package site.sugarnest.backend.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.entities.ProductEntity;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionResponse {
    private Long id;
    private String name;
    private String description;
    private String code;
    private Double percentageDiscount;
    private Double fixedDiscount;
    private Integer quantity;
    private Date startTime;
    private Date endTime;
    private Integer status;
    private Integer isDelete;
    private String applicableCondition;
    private Integer usageLimit;
    private List<AccountEntity> applicableAccount;
    private List<ProductEntity> applicableProducts;
    private String promotionType;
    private String createdBy;
}
