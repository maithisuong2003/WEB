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
                "cloud_name", "dox1v0f5d",
                "api_key", "297374599641647",
                "api_secret", "E2T7V7gZujHY9Ej8S8tgpu003t4"));
    }
}