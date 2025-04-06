package site.sugarnest.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Data
public class AddressEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_account")
    private AccountEntity accountEntity;

    private String address;
}