package site.laptopshop.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Table(name = "accounts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String accountName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, columnDefinition = "DATE")
    private Date birthday;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(columnDefinition = "varchar(99) default 'false'")
    private String isDelete;

    @Column(columnDefinition = "varchar(99) default 'true'")
    private String isActive;

    @Column(columnDefinition = "datetime default current_timestamp")
    private LocalDateTime createAt;

    private String image;

    @Column(columnDefinition = "datetime default current_timestamp")
    private LocalDateTime updateAt;

    private Date deleteAt;

    private String typeName;

    private String idOther;

    private String currentPassword;

    @Column(columnDefinition = "int default '0'")
    private Integer number_login_fail;


    @ManyToMany(fetch = FetchType.LAZY)
    private Set<RoleEntity> roles;

    public void setCreateAt() {
        this.createAt = LocalDateTime.now();
    }

    public void setUpdateAt() {
        this.updateAt = LocalDateTime.now();
    }

    public String verificationCode;
    private String enabled;
}
