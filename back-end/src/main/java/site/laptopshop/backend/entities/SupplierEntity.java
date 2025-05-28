package site.laptopshop.backend.entities;
import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "suppliers")
@Data
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nameSupplier;

    private String isActive;
}