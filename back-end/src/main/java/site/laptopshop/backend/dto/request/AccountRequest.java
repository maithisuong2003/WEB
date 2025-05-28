package site.laptopshop.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountRequest {
    private Long id;

    private String accountName;

    private String password;

    private String fullName;

    private Date birthday;

    private String address;

    private String email;

    private String phone;

    private String isDelete;

    private String isActive;

    private Date createAt;

    private String image;

    private Date updateAt;

    private Date deleteAt;

    private Integer type;

    private String idOther;

    private String currentPassword;

    private Date timestamp;

    private Integer number_login_fail;

    private List<String> roles;
}
