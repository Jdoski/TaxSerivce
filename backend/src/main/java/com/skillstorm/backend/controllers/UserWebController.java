package com.skillstorm.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import com.skillstorm.backend.services.UserService;

@Controller
@RequestMapping("/")
@CrossOrigin(allowCredentials = "true", originPatterns = "http://localhost:5173")
public class UserWebController {
    @Autowired
    UserService userService;


    @GetMapping("signin")
    public RedirectView redirectView() {
        userService.getEmail();
        return new RedirectView("http://localhost:5173");
    }
}
