package site.laptopshop.backend.dto.dto;

import jakarta.persistence.Column;
import lombok.*;
import site.laptopshop.backend.entities.*;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String nameProduct;
    private String description;
    private SupplierEntity supplierEntity;
    private ProducerEntity producerEntity;
    private CategoryEntity categoryEntity;
    private String cpu;
    private String gpu;
    private String os;
    private BigDecimal weight;
    private String ram;
    private String storage;
    private String refreshRate;
    private String isActive;
    private String isDelete;
    private String status;
    private List<ImageProductEntity> imageProductEntity;
    private List<SizeColorProductEntity> sizeColorProductsEntity;
    private List<RateEntity> ratesEntity;
    private List<ImportCouponDetailEntity> importCouponDetailsEntity;
    private List<OrderDetailEntity> orderDetailsEntity;

}

