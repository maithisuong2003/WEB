package site.laptopshop.backend.util;

import lombok.NoArgsConstructor;
import org.apache.commons.compress.compressors.bzip2.BZip2CompressorOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@NoArgsConstructor(force = true)
public class RotateLog extends SpringBootServletInitializer {

    private Util util;

    @Autowired
    public RotateLog(Util util) {
        this.util = util;
    }

    private String getCurrentDate() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern(util.getFormatDate()));
    }

    private final Logger logger = LoggerFactory.getLogger(RotateLog.class);

    public void checkAndCompressLogFile() {
        try {
            File directory = new File(util.getPathFile());
            if (!directory.exists()) directory.mkdir();
            if (directory.isDirectory()) {
                File[] listFile = directory.listFiles();
                if (listFile != null) {
                    for (File childFile : listFile) {
                        if (childFile.isFile() && childFile.getName().endsWith(util.getExtFileOutput())) {
                            String date = childFile.getName().substring(childFile.getName().length() - util.getFormatDate().length() - util.getExtFileOutput().length(),
                                    childFile.getName().length() - util.getExtFileOutput().length());
                            String nameChildFile = childFile.getName().substring(0, childFile.getName().length() - util.getFormatDate().length() - util.getExtFileOutput().length() - 1);

                            if (!date.equals(getCurrentDate()) || !nameChildFile.equals(util.getNameFile())) {
                                fileToZip(childFile, listFile);
                            }
                        }
                    }
                }
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }

    private void fileToZip( File childFile, File[] listFile) {
        long count = -1;
        String nameDateChildFile = childFile.getName().substring(0, childFile.getName().length() - util.getExtFileOutput().length());

        for (File child : listFile) {
            String nameFile = child.getName().substring(0, child.getName().indexOf("."));

            if(nameFile.equals(nameDateChildFile)) {
                if (child.isFile() && child.getName().endsWith(util.getExtFileZip())) {
                    long numFile = Long.parseLong(child.getName().substring(child.getName().indexOf(".") + 1, child.getName().lastIndexOf(".")));
                    if (numFile > count) {
                        count = numFile;
                    }
                }
            }
        }

        String zipFilePath = childFile.getAbsolutePath().substring(0, childFile.getAbsolutePath().length() - util.getExtFileOutput().length()) + "." + ++count + util.getExtFileZip();
        zipFile(childFile, zipFilePath);
        childFile.delete();
    }

    private void zipFile(File inputFile, String zipFilePath) {
        try (FileInputStream fis = new FileInputStream(inputFile);
             FileOutputStream fos = new FileOutputStream(zipFilePath);
             BZip2CompressorOutputStream bzip2OS = new BZip2CompressorOutputStream(fos)) {

            byte[] buffer = new byte[1024];
            int length;
            while ((length = fis.read(buffer)) > 0) {
                bzip2OS.write(buffer, 0, length);
            }
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }
}
