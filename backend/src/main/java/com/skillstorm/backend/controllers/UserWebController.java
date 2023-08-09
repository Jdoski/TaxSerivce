package com.skillstorm.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/users")
@CrossOrigin(allowCredentials = "true", originPatterns = "http://localhost:5173")
public class UserWebController {

    @GetMapping("/signin")
    public RedirectView redirectView() {
        // Hijack email
        return new RedirectView("http://localhost:5173");
    }

}
