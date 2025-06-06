package site.laptopshop.backend.service.account;

import site.laptopshop.backend.dto.dto.PasswordChangeRequest;
import site.laptopshop.backend.dto.request.AccountRequest;
import site.laptopshop.backend.dto.response.AccountResponse;
import site.laptopshop.backend.entities.AccountEntity;

import java.util.List;

public interface IAccountService {
    void createAccount(AccountRequest accountDto);

    void editAccount(Long id, AccountRequest accountDto);

    void editMyAccount(AccountRequest accountDto);

    void editMyPassword(PasswordChangeRequest passwordChangeRequest);

    void resetPassword(String token, String newPassword);

    List<AccountResponse> findAll();

    AccountResponse findById(Long id);

    AccountResponse getMyInfo();

    boolean checkExistedEmail(String email);
    boolean checkExistedAccount(String accountName);

    void deleteAccount(Long id);

    AccountEntity getAccount();
    Long totalAccount();
    List<AccountResponse> getNewAccounts(int limit);

}
