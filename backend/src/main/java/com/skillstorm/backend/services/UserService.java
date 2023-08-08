package com.skillstorm.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillstorm.backend.models.User;
import com.skillstorm.backend.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    // return all users
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    // return user by their id
    public User findUserById(String id) {
        Optional<User> user = userRepo.findById(id);

        if(user.isPresent()) {
            return user.get();
        }
        else{
            return null;
        }
    }

    // return user by their email
    public User loadUserByUsername(String email) {
        Optional<User> user = userRepo.findByUsername(email);

        if(user.isPresent()) {
            return user.get();
        }
        else{
            return null;
        }
    }

    // create a user
    public String createUser(User user) {
        Optional<User> userExists = userRepo.findByEmail(user.getUsername());
        if (userExists.isPresent()) {
            return "Email account already exists";
        } else {
            // encode ssn
            user.setSsn(passwordEncoder.encode(user.getSsn()));
            // set role to user
            user.setRole("ROLE_USER");
            // save to db
            userRepo.save(user);
            return "User created";
        }
    }

    // delete a user by passing in the user
    public void deleteUser(User user) {
        userRepo.delete(user);
    } 

    // delete a user by passing in their id
    public void deleteUserById(String id) {
        userRepo.deleteById(id);
    }

    // update a user by their id
    //public User updateUserById(String id, User user) {
    public User updateUser(User user) {

        Optional<User> userToUpdate = userRepo.findById(user.get_id());
        //Optional<User> userToUpdate = userRepo.findById(id);

        if(userToUpdate.isPresent()) {
            return userRepo.save(user);
        }
        else{
            return null;
        }
    }
    // update a user by passing in the user
    /*public User updateUser(User user) {
        return userRepo.save(user);
    }*/
}

