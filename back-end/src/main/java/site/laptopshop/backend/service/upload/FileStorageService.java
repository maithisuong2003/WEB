package site.laptopshop.backend.service.upload;

import com.twelvemonkeys.imageio.plugins.webp.WebPImageReaderSpi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import site.laptopshop.backend.configuration.FileStorageProperties;

import javax.imageio.ImageIO;
import javax.imageio.spi.IIORegistry;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    static {
        IIORegistry.getDefaultInstance().registerServiceProvider(new WebPImageReaderSpi());
    }

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public byte[] getImage(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                throw new RuntimeException("Could not find image " + fileName);
            }
            return Files.readAllBytes(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Could not get image " + fileName, ex);
        }
    }

    public BufferedImage readImage(String fileName) {
        try {
            byte[] fileBytes = getImage(fileName);
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(fileBytes));
            if (image == null) {
                throw new RuntimeException(fileName + " is not an image file.");
            }
            return image;
        } catch (IOException ex) {
            throw new RuntimeException("Could not read image " + fileName, ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (originalFileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + originalFileName);
            }

            String extension = getFileExtension(originalFileName);
            String newFileName = generateFileName() + "." + extension;

            Path targetLocation = this.fileStorageLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return newFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    private String generateFileName() {
        return UUID.randomUUID().toString();
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex == -1) {
            throw new RuntimeException("No file extension found for " + fileName);
        }
        return fileName.substring(dotIndex + 1);
    }
}
