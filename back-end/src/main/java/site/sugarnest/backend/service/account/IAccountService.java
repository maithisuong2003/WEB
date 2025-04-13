package site.sugarnest.backend.service.account;

import site.sugarnest.backend.dto.request.AccountRequest;
import site.sugarnest.backend.dto.response.AccountResponse;
import site.sugarnest.backend.entities.AccountEntity;

import java.util.List;

public interface IAccountService {
    void createAccount(AccountRequest accountDto);
    boolean checkExistedEmail(String email);


}
