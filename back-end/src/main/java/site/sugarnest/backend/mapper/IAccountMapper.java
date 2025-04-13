package site.sugarnest.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import site.sugarnest.backend.dto.request.AccountRequest;
import site.sugarnest.backend.dto.response.AccountResponse;
import site.sugarnest.backend.entities.AccountEntity;

@Mapper(componentModel = "spring")
public interface IAccountMapper {
    AccountResponse mapToAccountDto(AccountEntity accountEntity);

    @Mapping(target = "roles", ignore = true)
    AccountEntity mapToAccountEntity(AccountRequest accountDto);

}
