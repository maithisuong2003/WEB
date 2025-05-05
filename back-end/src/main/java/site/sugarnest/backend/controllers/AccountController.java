package site.sugarnest.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.request.AccountExistRequest;
import site.sugarnest.backend.dto.request.AccountRequest;
import site.sugarnest.backend.dto.request.EmailExistResquest;
import site.sugarnest.backend.dto.response.AccountResponse;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.service.account.IAccountService;


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