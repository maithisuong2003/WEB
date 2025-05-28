package site.laptopshop.backend.entities;
import lombok.Data;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "logs")
@Data
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer level;

    private String ip;

    @ManyToOne
    @JoinColumn(name = "id_account")
    private AccountEntity accountEntity;

    private String src;

    private String content;

    @Column(nullable = false, columnDefinition = "datetime default current_timestamp")
    private Date createAt;

    private String status;

    @Column(nullable = false, columnDefinition = "datetime default current_timestamp")
    private Date updateAt;
}
