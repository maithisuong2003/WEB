package site.sugarnest.backend.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "order_details")
@Data
public class OrderDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_order", nullable = false)
    private OrderEntity orderEntity;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private ProductEntity productEntity;

    private Integer quantity;

    private Double price;

    private String productSize;

    private String productColor;
}
