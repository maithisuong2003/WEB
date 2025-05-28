package site.laptopshop.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import site.sugarnest.backend.dto.response.RoleResponse;

import java.util.Date;
import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountResponse {

    private Long id;

    private String accountName;

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

    private Set<RoleResponse> roles;



}
