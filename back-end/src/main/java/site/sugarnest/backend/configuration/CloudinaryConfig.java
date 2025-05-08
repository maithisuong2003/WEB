package site.sugarnest.backend.configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dhqv00way",
                "api_key", "391235872846385",
                "api_secret", "7nty1hdaRvIHvEM_Q2iF8izjSsc"));
    }
}