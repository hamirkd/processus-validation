package com.processus.controllers;


import com.processus.entities.MyConstants;
import java.util.Properties;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
 
@Controller
public class SimpleEmailExampleController {
 
    @Autowired
    public JavaMailSender emailSender;
 
    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail() {
 
        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();
         
        message.setTo(MyConstants.FRIEND_EMAIL);
        message.setSubject("Test send mail spring boot");
        message.setText("======= Sping is good =============");
 
        // Send Message!
        this.emailSender.send(message);
 
        return "Email Sent!";
    }
 
}
