package site.laptopshop.backend.dto.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ProducerDto {
    private Integer id;

    private String nameProducer;

    private String isActive;

}
