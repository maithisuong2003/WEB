package site.laptopshop.backend.dto.dto;

import lombok.Data;

@Data
public class SendEmailDto {
    private String email;
    private String verificationCode;
}
