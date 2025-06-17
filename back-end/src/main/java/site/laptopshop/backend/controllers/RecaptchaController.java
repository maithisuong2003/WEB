package site.laptopshop.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/recaptcha")
public class RecaptchaController {

        private static final String SECRET_KEY = "6LfWf2MrAAAAAO38sWvlw66YO7wVe1jw4GavVIzG"; // <-- Dán secret key ở đây
    private static final String VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    @PostMapping("/verify")
    public ResponseEntity<String> verifyRecaptcha(@RequestParam("token") String token) {
        RestTemplate restTemplate = new RestTemplate();

        // Tạo body gửi tới Google
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", SECRET_KEY);
        params.add("response", token);

        // Gửi POST request đến Google
        ResponseEntity<Map> response = restTemplate.postForEntity(VERIFY_URL, params, Map.class);
        Map body = response.getBody();

        if (body != null && (Boolean) body.get("success")) {
            return ResponseEntity.ok("Captcha hợp lệ");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Captcha không hợp lệ");
        }
    }
}
