package site.laptopshop.backend.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import site.sugarnest.backend.constant.PredefinedRole;
import site.sugarnest.backend.entities.AccountEntity;
import site.sugarnest.backend.exception.AppException;
import site.sugarnest.backend.exception.ErrorCode;
import site.sugarnest.backend.reponsitories.IAccountRepository;
import site.sugarnest.backend.reponsitories.IRoleRepository;
import site.sugarnest.backend.service.account.JwtService;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final IAccountRepository accountRepository;
    private final JwtService jwtService;


    @Autowired
    IRoleRepository roleRepository;


    public CustomOAuth2UserService(IAccountRepository accountRepository, JwtService jwtService) {
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);
        return processOAuth2User(oAuth2User);
    }

    public OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String providerId = (String) attributes.get("sub");
        String email = oAuth2User.getAttribute("email");
        String fullName = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");
        var user = accountRepository.findByEmailWithRolesAndPermissions(email);
        if (user == null) {
            user = AccountEntity.builder()
                    .accountName(email)
                    .fullName(fullName)
                    .email(email)
                    .image(picture)
                    .typeName("google")
                    .idOther(providerId)
                    .address("Admin address")
                    .phone("123456789")
                    .enabled("true")
                    .birthday(new Date())
                    .password("123456")
                    .number_login_fail(0)
                    .roles(new HashSet<>(Collections.singletonList(roleRepository.findById(PredefinedRole.USER_ROLE)
                            .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXITED)))))
                    .isActive("true")
                    .isDelete("false")
                    .build();
            accountRepository.save(user);
        }
        String jwtToken = jwtService.generateToken(accountRepository.findByEmailWithRolesAndPermissions(email));

        return new DefaultOAuth2User(
                Collections.singletonList(() -> "ROLE_USER"),
                Collections.singletonMap("jwtToken", jwtToken),
                "jwtToken");
    }
}
