package site.laptopshop.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import site.laptopshop.backend.dto.request.AccountRequest;
import site.laptopshop.backend.dto.response.AccountResponse;
import site.laptopshop.backend.dto.dto.SendEmailDto;
import site.laptopshop.backend.entities.AccountEntity;

@Mapper(componentModel = "spring")
public interface IAccountMapper {
    AccountResponse mapToAccountDto(AccountEntity accountEntity);

    @Mapping(target = "roles", ignore = true)
    AccountEntity mapToAccountEntity(AccountRequest accountDto);

    AccountEntity mapToEmailDto(SendEmailDto sendEmailDto);
}
