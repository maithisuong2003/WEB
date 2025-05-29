package site.laptopshop.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.laptopshop.backend.entities.AccountEntity;
import site.laptopshop.backend.entities.OrderDetailEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderResponse {
    private Integer id;

    private Date createAt;

    private Date deliveryAt;

    private String statusPay;

    private String sale;

    private Double free_ship;

    private Double totalPrice;

    private String status;

    private String address;

    private List<OrderDetailEntity> orderItems  = new ArrayList<>();

    private AccountEntity accountEntity;

    private String note;

    private Date updateAt;
}
