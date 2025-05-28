    package site.laptopshop.backend.entities;
    import com.fasterxml.jackson.annotation.JsonBackReference;
    import lombok.Data;

    import jakarta.persistence.*;
    import site.sugarnest.backend.entities.InventoryEntity;
    import site.sugarnest.backend.entities.ProductEntity;

    @Entity
    @Table(name = "size_color_products")
    @Data
    public class SizeColorProductEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "id_product", nullable = false)
        @JsonBackReference
        private ProductEntity productEntity;

        @OneToOne(mappedBy = "sizeColorProductEntity", cascade = CascadeType.ALL)
        private InventoryEntity inventoryEntity;

        private String size;
        private String color;

        @Column(nullable = false, columnDefinition = "decimal(10,2)")
        private Double listPrice;

        @Column(nullable = false)
        private Long discount;

        @Transient
        private Double discountPrice;

        public Double getDiscountPrice() {
            return listPrice - (listPrice * discount / 100);
        }
    }


