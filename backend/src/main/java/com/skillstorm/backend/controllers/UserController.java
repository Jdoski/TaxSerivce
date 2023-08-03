package com.skillstorm.backend.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.skillstorm.backend.models.User;
import com.skillstorm.backend.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class UserController {
    
    @Autowired
    UserService userService;

    // return all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    // return a user by their id
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable ObjectId id) {
        User user = userService.findUserById(id);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // delete a user by their id
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable ObjectId id) {
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
        User createdUser = userService.createUser(user);

        return new ResponseEntity<User>(createdUser, HttpStatus.CREATED);
    }

    // update a user by their id
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable ObjectId id, @RequestBody User user) {
        User updatedUser = userService.updateUserById(id, user);
        
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }


}
