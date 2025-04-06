package site.sugarnest.backend.util;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class Util {

    @Value("${log.formatDate}")
    public String formatDate;

    @Value("${log.file.ext}")
    public String extFileOutput;

    @Value("${log.file.zip.ext}")
    public String extFileZip;

    @Value("${log.file.maxMb}")
    public int maxMBOfFile;

    @Value("${log.file.name}")
    public String nameFile;

    @Value("${log.path}")
    public String pathFile;
}