package site.laptopshop.backend.entities;
import lombok.Data;
import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "import_coupons_details")
@Data
public class ImportCouponDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_import_coupon", nullable = false)
    private ImportCouponEntity importCouponEntity;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private ProductEntity productEntity;

    private Double price;

    private Long quantity;

    private Date createAt;

    private Date deleteAt;
}