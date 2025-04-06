package site.sugarnest.backend.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import jakarta.persistence.*;
@Entity
@Table(name = "image_products")
@Data
public class ImageProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false)
    @JsonBackReference
    private ProductEntity productEntity;

    @Column(columnDefinition = "mediumtext")
    private String image;
}