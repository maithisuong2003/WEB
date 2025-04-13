package site.sugarnest.backend.controllers;

import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.sugarnest.backend.dto.dto.AuthRequestDto;
import site.sugarnest.backend.dto.dto.AuthResponseDto;
import site.sugarnest.backend.dto.request.IntrospectRequest;
import site.sugarnest.backend.dto.request.LogoutRequest;
import site.sugarnest.backend.dto.request.RefreshRequest;
import site.sugarnest.backend.dto.response.ApiResponse;
import site.sugarnest.backend.dto.response.IntrospectResponse;
import site.sugarnest.backend.service.Athorization.AuthenticationService;

import java.text.ParseException;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthResponseDto> login(@RequestBody AuthRequestDto authRequestDto) {
        var authResult = authenticationService.authenticate(authRequestDto);
        return ApiResponse.<AuthResponseDto>builder()
                .message("Login successful!")
                .result(authResult)
                .build();
    }
    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws JOSEException, ParseException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .message("Introspect successful!")
                .result(result)
                .build();

    }
    @PostMapping("/refresh")
    public ApiResponse<AuthResponseDto> refresh(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthResponseDto>builder()
                .message("Refresh successful!")
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().message("Logout success").build();
    }

}