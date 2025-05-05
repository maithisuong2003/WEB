package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.AccountExistRequest;
import site.sugarnest.backend.dto.request.AccountRequest;
import site.sugarnest.backend.dto.request.EmailExistResquest;
import site.sugarnest.backend.dto.request.PasswordResetRequest;

import site.sugarnest.backend.dto.response.AccountResponse;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.service.account.IAccountService;
import site.sugarnest.backend.dto.dto.PasswordChangeRequest;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {

    private IAccountService iAccountService;

    @PostMapping("register")
    public ApiResponse<String> createAccount(@RequestBody AccountRequest accountDto) {
        iAccountService.createAccount(accountDto);
        return ApiResponse.<String>builder()
                .code(200)
                .message("Please enter your verification code")
                .build();
    }

    @PutMapping("/resetPassword")
    public ApiResponse<String> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        iAccountService.resetPassword(passwordResetRequest.getToken(), passwordResetRequest.getNewPassword());
        return ApiResponse.<String>builder()
                .code(200)
                .message("Success")
                .build();
    }

    @GetMapping("/myInfo")
    public ApiResponse<AccountResponse> getMyInfo() {
        return ApiResponse.<AccountResponse>builder()
                .code(200)
                .message("Success")
                .result(iAccountService.getMyInfo())
                .build();
    }
    @PostMapping("/checkAccountName")
    public ApiResponse<String> checkExistedAccount(@RequestBody AccountExistRequest accountExistRequest) {
        if (iAccountService.checkExistedAccount(accountExistRequest.getAccountName())) {
            return ApiResponse.<String>builder()
                    .code(200)
                    .result("true")
                    .build();
        } else {
            return ApiResponse.<String>builder()
                    .code(404)
                    .result("false")
                    .build();
        }
    }

    @PostMapping("/checkEmail")
    public ApiResponse<String> checkExistedEmail(@RequestBody EmailExistResquest emailExistRequest) {
        if (iAccountService.checkExistedEmail(emailExistRequest.getEmail())) {
            return ApiResponse.<String>builder()
                    .code(200)
                    .result("true")
                    .build();
        } else {
            return ApiResponse.<String>builder()
                    .code(404)
                    .result("false")
                    .build();
        }

    }
}
