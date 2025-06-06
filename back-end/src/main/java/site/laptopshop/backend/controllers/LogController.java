package site.laptopshop.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import site.laptopshop.backend.util.RotateLog;

@EnableScheduling
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class LogController {
    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Autowired
    private final RotateLog rotateLog;

    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(fixedRate = 5000)
    public void onStart() {
        logger.info("Starting log file check and compression.");
        rotateLog.checkAndCompressLogFile();
    }

    @PostMapping("/show")
    public String show() {
        logger.info("Showing log file success");
        return "done";
    }
}