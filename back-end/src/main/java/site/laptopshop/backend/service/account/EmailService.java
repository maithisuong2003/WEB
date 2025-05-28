package site.laptopshop.backend.service.account;

import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.laptopshop.backend.dto.dto.SendEmailDto;
import site.laptopshop.backend.entities.AccountEntity;
import site.laptopshop.backend.entities.TokenEntity;
import site.laptopshop.backend.exception.AppException;
import site.laptopshop.backend.exception.ErrorCode;
import site.laptopshop.backend.reponsitories.IAccountRepository;
import site.laptopshop.backend.reponsitories.ITokenRepository;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private IAccountRepository iaccountRepository;

    @Autowired
    private ITokenRepository tokenRepository;

    public String generateResetToken(String email) {
        String token = UUID.randomUUID().toString();
        TokenEntity tokenEntity = new TokenEntity(email, token);
        tokenRepository.save(tokenEntity);
        return token;
    }



    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    public void sendMail(String accountEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        InternetAddress fromAddress;
        try {
            fromAddress = new InternetAddress("21130551@st.hcmuaf.edu.vn", "LaptopShop");
            message.setFrom(String.valueOf(fromAddress));
            message.setTo(accountEmail);
            message.setSubject(subject);
            message.setText("Mã xác thực: " + body);
            javaMailSender.send(message);
        } catch (UnsupportedEncodingException e) {
            throw new AppException(ErrorCode.SEND_MAIL_FAILED);
        }
    }

    public void verifyMail(SendEmailDto sendEmailDto) {
        AccountEntity entity = iaccountRepository.findByEmail(sendEmailDto.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXITED));

        if (passwordEncoder.matches(sendEmailDto.getVerificationCode(), entity.getVerificationCode())) {
            entity.setEnabled("true");
            iaccountRepository.save(entity);
        } else {
            throw new AppException(ErrorCode.VERIFICATION_ACCOUNT_INCORRECT_CODE);
        }
    }

}









