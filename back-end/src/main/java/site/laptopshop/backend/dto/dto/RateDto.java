package site.laptopshop.backend.dto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RateDto {
    private Long id;

    private Long accountId;

    private Long productId;

    private Long numberStar;

}
