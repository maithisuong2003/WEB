package site.laptopshop.backend.service.account;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.constant.PredefinedRole;
import site.laptopshop.backend.dto.dto.PasswordChangeRequest;
import site.laptopshop.backend.dto.request.AccountRequest;
import site.laptopshop.backend.dto.response.AccountResponse;
import site.laptopshop.backend.entities.AccountEntity;
import site.laptopshop.backend.entities.RoleEntity;
import site.laptopshop.backend.entities.TokenEntity;
import site.laptopshop.backend.exception.AppException;
import site.laptopshop.backend.exception.ErrorCode;
import site.laptopshop.backend.mapper.IAccountMapper;
import site.laptopshop.backend.reponsitories.IAccountRepository;
import site.laptopshop.backend.reponsitories.IRoleRepository;
import site.laptopshop.backend.reponsitories.ITokenRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@AllArgsConstructor
public class AccountService implements IAccountService {

    private IAccountRepository iAccountRepository;
    private IAccountMapper iAccountMapper;
    private EmailService emailService;
    private ITokenRepository tokenRepository;
    IRoleRepository roleRepository;

    public void createAccount(AccountRequest accountDto) {
        if (iAccountRepository.findByEmail(accountDto.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.ACCOUNT_EXITED);
        }

        AccountEntity accountEntity = iAccountMapper.mapToAccountEntity(accountDto);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        accountEntity.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        accountEntity.setCurrentPassword(passwordEncoder.encode(accountDto.getPassword()));

        accountEntity.setIsDelete("false");
        accountEntity.setIsActive("true");
        accountEntity.setCreateAt();
        accountEntity.setUpdateAt();
        accountEntity.setNumber_login_fail(0);
        accountEntity.setEnabled("false");
        // Set role
        accountEntity.setRoles(new HashSet<>(Collections.singletonList(roleRepository.findById(PredefinedRole.USER_ROLE)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXITED)))));

        String verificationCode = UUID.randomUUID().toString();
        accountEntity.setVerificationCode(passwordEncoder.encode(verificationCode));
        emailService.sendMail(accountDto.getEmail(), "Xác thực email", verificationCode);
        iAccountRepository.save(accountEntity);
        iAccountMapper.mapToAccountDto(accountEntity);
    }


    //    @PreAuthorize("hasAuthority('ACCOUNTS_PUT')")
    @Override
    public void editAccount(Long id, AccountRequest accountDto) {
        AccountEntity accountEntity = iAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));

        accountEntity.setFullName(accountDto.getFullName());
        accountEntity.setPhone(accountDto.getPhone());
        accountEntity.setAddress(accountDto.getAddress());
        accountEntity.setBirthday(accountDto.getBirthday());
        System.out.println(accountDto.getBirthday());
        accountEntity.setAddress(accountDto.getAddress());

        if (accountDto.getPassword() != null && !accountDto.getPassword().isEmpty()) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            accountEntity.setPassword(passwordEncoder.encode(accountDto.getPassword()));
            accountEntity.setCurrentPassword(passwordEncoder.encode(accountDto.getPassword()));
        }

        if (accountDto.getRoles() != null && !accountDto.getRoles().isEmpty()) {
            Set<RoleEntity> newRoles = accountDto.getRoles().stream()
                    .map(roleName -> roleRepository.findById(roleName)
                            .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXITED)))
                    .collect(Collectors.toSet());
            accountEntity.setRoles(newRoles);
        }
        accountEntity.setIsActive(accountDto.getIsActive());
        accountEntity.setUpdateAt();

        iAccountRepository.save(accountEntity);
    }

    public void editMyAccount(AccountRequest accountDto) {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity accountEntity = iAccountRepository.findByAccountName(accountName)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        accountEntity.setFullName(accountDto.getFullName());
        accountEntity.setPhone(accountDto.getPhone());
        accountEntity.setAddress(accountDto.getAddress());
        accountEntity.setBirthday(accountDto.getBirthday());
        System.out.println(accountDto.getBirthday());
        accountEntity.setAddress(accountDto.getAddress());
        accountEntity.setIsActive(accountDto.getIsActive());
        accountEntity.setUpdateAt();

        iAccountRepository.save(accountEntity);
    }

    public void editMyPassword(PasswordChangeRequest passwordChangeRequest) {
        String password = passwordChangeRequest.getOldPassword();
        String newPassword = passwordChangeRequest.getNewPassword();

        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity accountEntity = iAccountRepository.findByAccountName(accountName)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean matchesPass = passwordEncoder.matches(password, accountEntity.getPassword());
        if (!matchesPass) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCHED);
        }
        accountEntity.setPassword(passwordEncoder.encode(newPassword));
        accountEntity.setCurrentPassword(passwordEncoder.encode(newPassword));
        accountEntity.setUpdateAt();
        iAccountRepository.save(accountEntity);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        Optional<TokenEntity> tokenEntityOptional = tokenRepository.findByToken(token);
        if (!tokenEntityOptional.isPresent() || tokenEntityOptional.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        TokenEntity tokenEntity = tokenEntityOptional.get();
        AccountEntity accountEntity = iAccountRepository.findByEmail(tokenEntity.getEmail()).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        if (accountEntity == null) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_EXITED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        accountEntity.setPassword(passwordEncoder.encode(newPassword));
        accountEntity.setCurrentPassword(passwordEncoder.encode(newPassword));
        accountEntity.setUpdateAt();
        iAccountRepository.save(accountEntity);
    }


    @Override
    public List<AccountResponse> findAll() {
        List<AccountEntity> accountEntities = iAccountRepository.findAll();
        accountEntities.removeIf(accountEntity -> accountEntity.getAccountName().equals("admin"));
        return accountEntities.stream().map(iAccountMapper::mapToAccountDto).toList();
    }

    //    @PreAuthorize("hasAuthority('ACCOUNTS_GET')")
    @Override
    public AccountResponse findById(Long id) {
        AccountEntity accountEntity = iAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        return iAccountMapper.mapToAccountDto(accountEntity);
    }

    @Override
    public AccountResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        AccountEntity accountEntity = iAccountRepository.findByAccountName(accountName)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        return iAccountMapper.mapToAccountDto(accountEntity);
    }

    @Override
    public boolean checkExistedEmail(String email) {
        return iAccountRepository.findByEmail(email).isPresent();
    }

    @Override
    public void deleteAccount(Long id) {
        AccountEntity accountEntity = iAccountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        accountEntity.setIsDelete("true");
        accountEntity.setUpdateAt();
        iAccountRepository.save(accountEntity);
    }

    @Override
    public AccountEntity getAccount() {
        var context = SecurityContextHolder.getContext();
        String accountName = context.getAuthentication().getName();
        return iAccountRepository.findByAccountName(accountName).orElseThrow(() -> new RuntimeException("Account not found"));
    }
    @Override
    public Long totalAccount() {
        return iAccountRepository.count();
    }

    @Override
    public List<AccountResponse> getNewAccounts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<AccountEntity> accountEntities = iAccountRepository.findNewAccounts(pageable);
        accountEntities.removeIf(accountEntity -> accountEntity.getAccountName().equals("admin"));
        return accountEntities.stream().map(iAccountMapper::mapToAccountDto).toList();
    }
    @Override
    public boolean checkExistedAccount(String accountName){ return iAccountRepository.findByAccountName(accountName).isPresent();}

}

