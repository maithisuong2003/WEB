package site.laptopshop.backend.entities;
import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "views")
@Data
public class ViewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    private ProductEntity productEntity;

    private String status;

    @ManyToOne
    @JoinColumn(name = "id_customer", nullable = false)
    private AccountEntity customer;
}
