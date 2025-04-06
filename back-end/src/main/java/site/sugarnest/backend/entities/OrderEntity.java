package site.sugarnest.backend.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, columnDefinition = "datetime default current_timestamp")
    private Date createAt;

    private Date deliveryAt;

    private String statusPay;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "id_account", nullable = false)
    private AccountEntity accountEntity;

    private String sale;

    private Double free_ship;

    private Double totalPrice;

    private String status;

    private String address;

    @OneToMany(mappedBy = "orderEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetailEntity> orderItems  = new ArrayList<>();

    @Column(columnDefinition = "longtext")
    private String note;

    private Date updateAt;
}
