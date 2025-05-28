package site.laptopshop.backend.entities;
import lombok.Data;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "import_coupons")
@Data
public class ImportCouponEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_supplier")
    private SupplierEntity supplierEntity;

    private Date date;

    private String status;

    @ManyToOne
    @JoinColumn(name = "id_producer")
    private ProducerEntity producerEntity;

    private Date createAt;

    private Date updateAt;

    private Date deleteAt;
}
