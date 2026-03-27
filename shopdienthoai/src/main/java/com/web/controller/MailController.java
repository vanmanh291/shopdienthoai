package com.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.service.MailService;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/test-mail")
    public String testMail(){

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("vanmanh29105@gmail.com");
        message.setSubject("Test Spring Boot Mail");
        message.setText("Mail gửi thành công");

        mailSender.send(message);

        return "Mail sent!";
    }
}
