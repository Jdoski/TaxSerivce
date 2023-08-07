package com.skillstorm.backend.controllers;

import java.io.IOException;
import java.util.List;

import javax.security.auth.message.config.AuthConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

/* 
import com.auth0.AuthenticationController;
import com.auth0.IdentityVerificationException;
import com.auth0.Tokens;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;*/
import com.skillstorm.backend.models.User;
import com.skillstorm.backend.services.UserService;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class UserController {
    
    @Autowired
    UserService userService;

    // @Autowired
    // private AuthConfig config;
    /* 
    @Autowired
    private AuthenticationController authenticationController;*/

    // return all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    // return a user by their id
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.findUserById(id);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // delete a user by their id
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        userService.deleteUserById(id);

        return new ResponseEntity<String>("User deleted successfully", HttpStatus.OK);
    }

    // delete a user by passing in the user
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(@RequestBody User user) {
        userService.deleteUser(user);

        return new ResponseEntity<String>("User deleted successfully", HttpStatus.OK);
    }

    // create a user
    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        
        String result = userService.createUser(user);

        return new ResponseEntity<String>(result, HttpStatus.CREATED);
    }

    // update a user by their id
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User updatedUser = userService.updateUserById(id, user);
        
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    // update a user
    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    @GetMapping(value="/hello")
    public String helloWorld() {
        return "Hello World";
    }

    @GetMapping("/login")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal) {
        return "index";
    }
    
    

    /* 
    @GetMapping(value = "/login")
    protected void login(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String redirectUri = "http://localhost:8080/callback";
        String authorizeUrl = authenticationController.buildAuthorizeUrl(request, response, redirectUri)
                .withScope("openid email")
                .build();
            response.sendRedirect(authorizeUrl);
    }

    @GetMapping(value = "/callback")
    public void callback(HttpServletRequest request, HttpServletResponse response) throws IdentityVerificationException, IOException{
        Tokens tokens = authenticationController.handle(request, response);

        DecodedJWT jwt = JWT.decode(tokens.getIdToken());
        TestingAuthenticationToken authToken2 = new TestingAuthenticationToken(jwt.getSubject(),
            jwt.getToken());
        authToken2.setAuthenticated(true);

        SecurityContextHolder.getContext().setAuthentication(authToken2);
        response.sendRedirect(request.getContextPath() + "/");;
        //response.sendRedirect(config.getContextPath(request) + "/");    
    }*/




}


