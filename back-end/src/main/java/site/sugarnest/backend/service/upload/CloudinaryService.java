package site.sugarnest.backend.service.upload;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    private String generateFileName() {
        return UUID.randomUUID().toString();
    }

    public Map upload(MultipartFile file) throws IOException {
        String fileName = generateFileName();
        Map uploadParams = ObjectUtils.asMap("public_id", fileName);
        return cloudinary.uploader().upload(file.getBytes(), uploadParams);
    }
}
