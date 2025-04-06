package site.sugarnest.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import jakarta.persistence.*;
import lombok.ToString;
import java.util.Date;

@Entity
@Table(name = "inventorys")
@Data
@ToString
public class InventoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_size_color_products", nullable = false)
    @JsonBackReference
    private SizeColorProductEntity sizeColorProductEntity;

    private Long quantity;
    private Date dateAdd;
    private Date lastUpdatedDate;

    public void setDateAdd() {
        this.dateAdd = new Date();
    }
    public void setLastUpdatedDate() {
        this.lastUpdatedDate = new Date();
    }
}



