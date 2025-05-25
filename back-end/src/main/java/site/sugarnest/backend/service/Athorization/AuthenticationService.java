package site.sugarnest.backend.service.Athorization;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import site.sugarnest.backend.dto.dto.AuthRequestDto;
import site.sugarnest.backend.dto.dto.AuthResponseDto;
import site.sugarnest.backend.dto.request.IntrospectRequest;
import site.sugarnest.backend.dto.request.LogoutRequest;
import site.sugarnest.backend.dto.request.RefreshRequest;
import site.sugarnest.backend.dto.response.IntrospectResponse;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.entities.InvalidatedTokenEntity;
import site.sugarnest.backend.exception.AppException;
import site.sugarnest.backend.exception.ErrorCode;
import site.sugarnest.backend.reponsitories.IAccountRepository;
import site.sugarnest.backend.reponsitories.InvalidatedTokenRepository;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@CommonsLog
@Service
public class AuthenticationService {

    @Autowired
    private IAccountRepository iAccountRepository;

    @Autowired
    private InvalidatedTokenRepository invalidatedTokenRepository;

    @Value("${SIGNER_KEY}")
    protected String SIGNER_KEY;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public AuthResponseDto authenticate(AuthRequestDto authRequestDto) {
        var user = iAccountRepository.findByAccountName(authRequestDto.getAccountName())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean matchesPass = passwordEncoder.matches(authRequestDto.getPassword(), user.getPassword());

        if (!matchesPass) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCHED);
        }

        var token = generateToken(user);

        return AuthResponseDto.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String generateToken(AccountEntity account) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getAccountName())
                .issuer("SugarNest.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(5, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .claim("id", account.getId())
                .claim("scope", buildScope(account))
                .jwtID(UUID.randomUUID().toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot sign JWT object", e);
            throw new RuntimeException(e);
        }
    }

    public AuthResponseDto refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        SignedJWT signedJWT = verifyToken(request.getToken());

        // Invalidate the old token
        String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedTokenEntity invalidatedTokenEntity = InvalidatedTokenEntity
                .builder()
                .id(jwtId)
                .expiryTime(expirationTime)
                .build();

        invalidatedTokenRepository.save(invalidatedTokenEntity);

        // Generate a new token
        String accountName = signedJWT.getJWTClaimsSet().getSubject();
        AccountEntity account = iAccountRepository.findByAccountName(accountName)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_EXITED));

        String token = generateToken(account);

        return AuthResponseDto.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String buildScope(AccountEntity account) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(account.getRoles())) {
            account.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
                if (!CollectionUtils.isEmpty(role.getPermissions())) {
                    role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
                }
            });
        }
        return stringJoiner.toString();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        SignedJWT signToken = verifyToken(request.getToken());
        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expirationTime = signToken.getJWTClaimsSet().getExpirationTime();

        InvalidatedTokenEntity invalidatedTokenEntity = InvalidatedTokenEntity
                .builder()
                .id(jit)
                .expiryTime(expirationTime)
                .build();

        invalidatedTokenRepository.save(invalidatedTokenEntity);
    }

    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(jwsVerifier);

        if (!(verified && expiryTime.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }
}