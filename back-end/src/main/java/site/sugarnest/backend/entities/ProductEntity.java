package site.sugarnest.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameProduct;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_supplier", nullable = false)
    private SupplierEntity supplierEntity;

    @ManyToOne
    @JoinColumn(name = "id_producer", nullable = false)
    private ProducerEntity producerEntity;

    @ManyToOne
    @JoinColumn(name = "id_categorie", nullable = false)
    private CategoryEntity categoryEntity;

    private String isActive;

    private String isDelete;

    private String status;

    @OneToMany(mappedBy = "productEntity", cascade = CascadeType.ALL)
    private List<ImageProductEntity> imageProductEntity;

    @OneToMany(mappedBy = "productEntity", cascade = CascadeType.ALL)
    private List<SizeColorProductEntity> sizeColorProductsEntity;

    @OneToMany(mappedBy = "productEntity")
    @JsonIgnore
    private List<RateEntity> ratesEntity;

    @OneToMany(mappedBy = "productEntity")
    @JsonIgnore
    private List<ImportCouponDetailEntity> importCouponDetailsEntity;

    @OneToMany(mappedBy = "productEntity")
    @JsonIgnore
    private List<OrderDetailEntity> orderDetailsEntity;

    private int views;
}
