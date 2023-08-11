package com.skillstorm.backend.controllers;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.http.HttpStatus;


import com.skillstorm.backend.models.User;
import com.skillstorm.backend.services.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin(allowCredentials = "true", originPatterns = "http://s3-cmelendez.s3-website-us-east-1.amazonaws.com")
public class UserController {
    
    @Autowired
    UserService userService;

    // Returns user by email address
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User userByEmail = userService.findUserByEmail(email);
        return new ResponseEntity<User>(userByEmail, HttpStatus.OK);
    }

    // delete a user by passing in the user
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(@RequestBody User user) {
        userService.deleteUser(user);

        return new ResponseEntity<String>("User deleted successfully", HttpStatus.OK);
    }

    // create a user
    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User result = userService.createUser(user);
        return new ResponseEntity<User>(result, HttpStatus.CREATED);
    }

    // update a user
    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    // get the login parameters and check if they are valid
    @PostMapping("/check-login")
    public String checkLogin(@RequestBody User user, RedirectAttributes redirectAttributes) {
        String username = user.getUsername();
        String password = user.getPassword();
        
        if (userService.checkLogin(username, password)) {
			if (SecurityContextHolder.getContext().getAuthentication() == null || 
			    SecurityContextHolder.getContext()
					.getAuthentication().getClass().equals(AnonymousAuthenticationToken.class)) {
				UsernamePasswordAuthenticationToken token = 
					new UsernamePasswordAuthenticationToken(username, password,new ArrayList<>());
				SecurityContextHolder.getContext().setAuthentication(token);
			}
			redirectAttributes.addFlashAttribute("message", "Login Successful");
			return username;

		}
		redirectAttributes.addFlashAttribute("message", "Invalid Username or Password");
		return null;
	}

}


