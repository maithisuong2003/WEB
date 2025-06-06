package site.laptopshop.backend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.laptopshop.backend.dto.response.ApiResponse;
import site.laptopshop.backend.service.upload.FileStorageService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadFile")
    public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        return new ApiResponse<>(200, "File uploaded successfully", fileName);
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            byte[] image = fileStorageService.getImage(fileName);
            String contentType = determineContentType(fileName);

            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            Resource resource = new ByteArrayResource(image);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private String determineContentType(String fileName) {
        try {
            String contentType = Files.probeContentType(Paths.get(fileName));
            if (contentType == null && fileName.endsWith(".webp")) {
                contentType = "image/webp";
            }
            return contentType;
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }
}
