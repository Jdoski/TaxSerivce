package com.skillstorm.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.http.HttpStatus;


import com.skillstorm.backend.models.User;
import com.skillstorm.backend.services.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    UserService userService;

    @Autowired
    private OAuth2AuthorizedClientService clientService;


    // return all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
    // Returns user by email address
    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@AuthenticationPrincipal OAuth2User user) {
        String email = user.getAttribute("email");
        User userByEmail = userService.findUserByEmail(email);
        return new ResponseEntity<User>(userByEmail, HttpStatus.OK);
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
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User result = userService.createUser(user);
        return new ResponseEntity<User>(result, HttpStatus.CREATED);
    }

    /*
    // update a user by their id
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User updatedUser = userService.updateUserById(id, user);
        
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }*/

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
    /* INTEND TO DELETE
    @GetMapping("/info")
    public Map<String, Object> userInfo(@AuthenticationPrincipal OAuth2User user){
        return user.getAttributes();
    } */

    @GetMapping("/accessToken")
    public String accessToken(Authentication auth) {

        // checking if the auth we pulled from the security context is a OAuth2AuthenticationToken
        if(auth instanceof OAuth2AuthenticationToken) {

            // casting the Authentication object to be a OAuth2AuthenticationToken object
            OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) auth;

            // retrieving the authorized client with *this specific* Authentication Principal (each user is unique)
            OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(authToken.getAuthorizedClientRegistrationId(), authToken.getName());


            /* Something like this for adding access token to http only cookie - make sure to take in HttpServletResponse as parameter
            Cookie cookie = new Cookie("Access Token", client.getAccessToken().getTokenValue());
            cookie.isHttpOnly();
            response.addCookie(cookie);
            */


            // returning the value of the token
            return client.getAccessToken().getTokenValue();
        }
        return "Access Token Not Found";
    }

    @GetMapping("/info")
    public Map<String, Object> userInfo(@AuthenticationPrincipal OAuth2User user){
        return user.getAttributes();
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/check-login")
    public RedirectView checkLogin(@RequestParam("username") String username, @RequestParam("password") String password, RedirectAttributes redirectAttributes) {
        if (userService.checkLogin(username, password)) {
			if (SecurityContextHolder.getContext().getAuthentication() == null || 
			    SecurityContextHolder.getContext()
					.getAuthentication().getClass().equals(AnonymousAuthenticationToken.class)) {
				UsernamePasswordAuthenticationToken token = 
					new UsernamePasswordAuthenticationToken(username, password,new ArrayList<>());
				SecurityContextHolder.getContext().setAuthentication(token);
			}
			redirectAttributes.addFlashAttribute("message", "Login Successful");
			return new RedirectView("hello");

		}
		redirectAttributes.addFlashAttribute("message", "Invalid Username or Password");
		return new RedirectView("login");
	}

}


