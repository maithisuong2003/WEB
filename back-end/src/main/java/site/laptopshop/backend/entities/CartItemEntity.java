package site.laptopshop.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import jakarta.persistence.*;
import lombok.ToString;

@Entity
@Table(name = "cart_items")
@Data
@ToString
public class CartItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_cart", nullable = false)
    private CartEntity cartEntity;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private ProductEntity productEntity;

    private Integer quantity;

    private Double price;

    private String productSize;

    private String productColor;
}
